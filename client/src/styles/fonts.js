import { css } from "styled-components/macro";

const fonts = css`
  @font-face {
    font-family: "Avenir";
    src: url("../fonts/AvenirLTStd-Book.woff2") format("woff2"),
      url("../fonts/AvenirLTStd-Book.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Avenir";
    src: url("../fonts/AvenirLTStd-Black.woff2") format("woff2"),
      url("../fonts/AvenirLTStd-Black.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Avenir";
    src: url("../fonts/AvenirLTStd-Heavy.woff2") format("woff2"),
      url("../fonts/AvenirLTStd-Heavy.woff2") format("woff2");
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;
