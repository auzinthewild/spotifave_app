import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import TopArtists from "./routes/TopArtists";
// import TopTracks from "./routes/TopTracks";
// import PlaylistID from "./pages/PlaylistID";
// import Playlists from "./routes/Playslists";
// import { Profile } from "./pages";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Profile />}>
//         <Route path="/top-artists" element={<TopArtists />} />
//         <Route path="/top-tracks" element={<TopTracks />} />
//         <Route path="/playlists/:id" element={<PlaylistID />} />
//         <Route path="/playlists" element={<Playlists />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );

ReactDOM.render(<App />, rootElement);
