import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./utils/constants.js";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={routes.DEFAULT}>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-left" theme="colored" />
    </Provider>
  </BrowserRouter>
);
