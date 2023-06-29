import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routes";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client_id } from "./constants/common";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { MaterialTailwindControllerProvider } from "../src/components/admin/widgets/context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <Provider store={store}>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <RouterProvider router={AppRouter} />
            <ToastContainer />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
