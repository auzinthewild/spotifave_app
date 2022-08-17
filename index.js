require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

/* deprecated - refactor to use URLSearchParams
const querystring = require("querystring");
*/

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

const path = require("path");
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "./client/build")));

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

// login route handler
app.get("/login", (req, res) => {
  console.log("hit");
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = [
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-private",
    "user-read-email",
    "user-top-read",
  ].join(" ");

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  }).toString();

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// callback route handler
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const dataParams = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
  }).toString();

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: dataParams,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;
        const queryParams = new URLSearchParams({
          access_token,
          refresh_token,
          expires_in,
        }).toString();

        res.redirect(`${FRONTEND_URI}/?${queryParams}`);
      } else {
        const errorParams = new URLSearchParams({
          error: "invalid_token",
        }).toString();
        res.redirect(`/?${errorParams}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

// refresh route handler
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;
  const dataParams = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  }).toString();

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: dataParams,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`);
});
