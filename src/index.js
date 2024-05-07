/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import MyReducer from "./Redux/index";
import { Provider } from "react-redux";

const store = createStore(MyReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme='dark'
      pauseOnFocusLoss
      closeButton={false}
      draggable
      pauseOnHover
      style={{
        top: 100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: "100%",
        zIndex: 999999999999,
      }}
    />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
