// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  h1 {
    font-size: 3rem;
    background: -webkit-linear-gradient(#FDFC47, #24FE41);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    background: -webkit-linear-gradient(#FDFC47, #24FE41);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  h3, h4 {
    margin: 0;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    :focus {
      outline: none;
    }
  }

  input {
    border: none;
    padding: 1rem;
    :focus {
    outline: none;
    }
  }

`;

export default GlobalStyle;
