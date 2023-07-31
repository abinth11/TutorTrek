import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client_id } from "./constants/common";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@material-tailwind/react";  
import { ToastContainer } from "react-toastify";
import Modal from 'react-modal';
import CONFIG_KEYS from "./config";

    
const root = ReactDOM.createRoot(   
  document.getElementById("root") as HTMLElement
);
Modal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CONFIG_KEYS.GOOGLE_AUTH_CLIENT_ID}>
        <Provider store={store}>
          <ThemeProvider>
              <RouterProvider router={AppRouter} />
              <ToastContainer />
          </ThemeProvider>
        </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);


