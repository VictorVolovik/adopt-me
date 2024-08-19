import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StrictMode } from "react";
import { DEBUG } from "./helpers/constants";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    {process.env.NODE_ENV === "development" && DEBUG ? (
  <StrictMode>
    <App />
  </StrictMode>
) : (
  <App />
)}
  </BrowserRouter>
);
