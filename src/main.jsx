import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/base.css";
import Home from "./views/Home";
import Login from "./views/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {localStorage.getItem("login") ? <Home /> : <Login />}
    </Provider>
  </React.StrictMode>
);
