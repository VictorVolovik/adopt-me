import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { DEBUG } from "./helpers/constants";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  process.env.NODE_ENV === "development" && DEBUG ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
