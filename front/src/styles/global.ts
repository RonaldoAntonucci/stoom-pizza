import { createGlobalStyle } from 'styled-components';

import imgBackground from '../assets/pizza-background.jpg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: url(${imgBackground});
    color: #fff;
    -webkit-font-smoothing: antialiased;

    display: flex;
    flex: 1;
    justify-content: center;
  }

  body, -moz-user-input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
`;
