import React, { Component } from 'react';
import Ipod from './js';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   body {
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
   }
`;

class App extends Component {
   render() {
      return (
         <React.Fragment>
            <Ipod />
            <GlobalStyles />
         </React.Fragment>
      );
   }
}

export default App;
