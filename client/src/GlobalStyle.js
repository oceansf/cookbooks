// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  h1 {
  font-size: 3rem;
  background: -webkit-linear-gradient(#FDFC47, #24FE41);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Pacifico', cursive;
}
`;

export default GlobalStyle;
