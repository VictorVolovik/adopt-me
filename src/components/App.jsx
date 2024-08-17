import { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import {
  DEBUG,
  DEFAULT_CACHE_TIME,
  DEFAULT_STALE_TIME,
  IMAGES_URL,
} from "../helpers/constants";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <div
      className="m-0 p-0"
      style={{
        background: `url(${IMAGES_URL}/pets/wallpaperB.jpg)`,
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
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
