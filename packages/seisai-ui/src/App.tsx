import React, { useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';
import { configureStore } from 'Store';
import { Provider } from 'react-redux';
import { checkAuth } from 'Store/User/UserActions';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'Store/IAppState';
import { AnyAction } from 'redux';
import { Routes } from 'Routes';

const theme = {
  colors: {
    accent: '#9230e3',
    grey: '#454545',
    darkGrey: '#181818',
    darkerGrey: '#121212',
    black: '#101010',
    border: { dark: '#151515' },
    text: '#dfdfdf',
    link: { normal: '#a5a5a5', hover: '#c5c5c5' },
  },
  forms: {
    border: { normal: '0.1em solid #444', focused: '0.1em solid #bfbfbf' },
  },
  padding: {
    standard: '1rem',
    tight: '0.5rem',
    wide: '1.5rem',
  },
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Bai+Jamjuree:400,700|Nunito:400,600,700&display=swap');

  html, body {
    color: ${theme.colors.text};
    font-size: 1em;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: Nunito, sans-serif;
  }
`;

const store = configureStore();

const App: React.FC = () => {
  useEffect(() => {
    (store.dispatch as ThunkDispatch<IAppState, null, AnyAction>)(checkAuth());
  });

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
