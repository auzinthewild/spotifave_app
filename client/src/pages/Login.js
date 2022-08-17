import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const StyledLoginContainer2 = styled.main`
  @media only screen and (max-width: 768px) {
    width: 90%;
    font-size: 16px;
  }
  @media only screen and (min-width: 768px) {
    width: 50%;
    font-size: 18px;
    margin: 30px;
  }
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spotifave-app.herokuapp.com/login";

console.log(LOGIN_URI);

const Login = () => (
  <StyledLoginContainer>
    <StyledLoginContainer2>
      <h1 style={{ color: "#A7B395" }}>Spotifave</h1>
      <p style={{ fontSize: "18px", color: "#ffffff" }}>
        If you're viewing this app from my portfolio, the Spotify API requires
        users' logins to be registered in order to use the API's functionality.
        This means that unless I've registered your Spotify account with the
        app, you won't be able to use it.
        <br /> <br /> To address this, I've created the following YouTube video
        which gives an overview of the application and it's functionality.
      </p>
      <div style={{ marginTop: "24px" }}>
        <a
          href="https://www.google.com"
          style={{ color: "#B3B3B3", fontSize: "18px" }}
          target="_blank"
          rel="noreferrer"
        >
          Watch the video
        </a>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <StyledLoginButton href={LOGIN_URI}>
          Log in to Spotify
        </StyledLoginButton>
      </div>
    </StyledLoginContainer2>
  </StyledLoginContainer>
);

export default Login;
