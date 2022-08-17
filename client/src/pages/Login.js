import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    <div style={{ width: "50%", margin: "30px", fontSize: "18px" }}>
      <h1>Spotifave</h1>
      <p style={{ fontSize: "18px" }}>
        If you're viewing this app from my portfolio, the Spotify API requires
        users' logins to be registered in order to use the API's functionality.
        This means that unless I've registered your Spotify account with the
        app, you won't be able to use it.
        <br /> <br /> To address this, I've created the following YouTube video
        which gives an overview of the application and it's functionality.
      </p>
      <div>Video Link</div>
    </div>
    <StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;
