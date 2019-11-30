import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { BrowserRouter } from "react-router-dom";
import { configureStore } from "Store";
import { Provider } from "react-redux";
import { checkAuth } from "Store/User/UserActions";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "Store/IAppState";
import { AnyAction } from "redux";
import { Routes } from "Routes";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Bai+Jamjuree:400,700|Nunito:400,600,700&display=swap');

  html, body {
    background: #101010;
    color: #DFDFDF;
    font-size: 1em;
    padding: 0;
  }

  * {
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
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
