import { GlobalStyle } from "./styles";
import { useState, useEffect } from "react";
import { accessToken, logout, createTopTracksPlaylist } from "./spotify.js";
import {
  Outlet,
  Link,
  useLocation,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components/macro";
import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlist,
  Playlists,
} from "./pages";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const StyledCreatePlaylistButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

// Scroll to top of page when changing routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />

      {!token ? (
        <Login />
      ) : (
        <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <StyledCreatePlaylistButton onClick={createTopTracksPlaylist}>
            Create Playlist
          </StyledCreatePlaylistButton>

          <div>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/playlists/:id" element={<Playlist />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </BrowserRouter>
            {/* <Outlet /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
