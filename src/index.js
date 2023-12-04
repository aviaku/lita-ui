import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import "./styles/dark.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { MetaMaskProvider } from "@metamask/sdk-react";
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "Demo React App",
            url: window.location.host,
          },
        }}
      >
        <App />
      </MetaMaskProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
