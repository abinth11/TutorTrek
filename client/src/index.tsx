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
import { MaterialTailwindControllerProvider } from "./components/pages/admin/widgets/context";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "./constants/common";
import { Elements } from "@stripe/react-stripe-js";
import StripeContainer from "./components/pages/payment-stripe/StripeContainer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      {/* <Elements stripe={stripePromise}> */}
        {/* <StripeContainer> */}
        <Provider store={store}>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <RouterProvider router={AppRouter} />
              <ToastContainer />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </Provider>
      {/* </Elements> */}
      {/* </StripeContainer> */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
