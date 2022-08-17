import { useState, useEffect } from "react";
import { StyledPlayerbar } from "../styles";
import styled from "styled-components/macro";
import { logout } from "../spotify.js";
import SpotifyPlayer from "react-spotify-web-playback";

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

function Playerbar({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <StyledPlayerbar>
      <div style={{ width: "100%" }}>
        <SpotifyPlayer
          styles={{
            color: "#fff",
            bgColor: "#121212",
            trackNameColor: "#fff",
            trackArtistColor: "#B3B3A6",
          }}
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </div>
      <div>
        <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
      </div>
    </StyledPlayerbar>
  );
}

export default Playerbar;
