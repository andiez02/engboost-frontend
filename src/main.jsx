import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./utils/constants.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={routes.DEFAULT}>
    <App />
  </BrowserRouter>
);
