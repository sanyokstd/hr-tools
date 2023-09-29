import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker-custom.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { createTheme } from '@mui/material/styles';

export default css`
  // Reset css
  // Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
  /* *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
    all: unset;
    display: revert;
  } */

  // Preferred box-sizing value
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  // Remove list styles (bullets/numbers)
  ol,
  ul {
    list-style: none;
  }

  // For images to not be able to exceed their container and clear images bottom space
  img {
    max-width: 100%;
    display: block;
  }

  // Removes spacing between cells in tables
  table {
    border-collapse: collapse;
  }

  // Revert the 'white-space' property for textarea elements on Safari
  textarea {
    white-space: revert;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }
  html,
  body {
    margin: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
    color: #333;
    min-width: 320px;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  @keyframes fadeinZoom {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const MainWrap = styled.div`
  max-width: 1200px;
  margin: 15px auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  min-height: calc(100vh - 30px);
  @media (max-width: 1200px) {
    margin: 15px;
  }
`;

export const Wrap = styled.div`
  max-width: 1024px;
  padding: 0 15px;
  margin: 0 auto;
`;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#73c41d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#969797',
    },
  },
});

export const Main = styled.div`
  display: flex;
  min-height: 300px;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

export const MainLeft = styled.div`
  flex: 0 0 300px;
  padding-right: 25px;
  @media (max-width: 1023px) {
    flex: auto;
    padding-right: 0;
  }
`;

export const MainRight = styled.div`
  flex: 1;
  @media (max-width: 1023px) {
    flex: auto;
  }
`;

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  flex-wrap: ${({ $wrap }) => $wrap || 'nowrap'};
  justify-content: ${({ $justify }) => $justify || 'flex-start'};
  align-items: ${({ $align }) => $align || 'stretch'};
`;
