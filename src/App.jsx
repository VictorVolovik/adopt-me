import { useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DEFAULT_CACHE_TIME,
  DEFAULT_STALE_TIME,
  IMAGES_URL,
} from "./helpers/constants";
import { Routes, Route, Link } from "react-router-dom";
import AdoptedPetContext from "./components/AdoptedPetContext";

const Details = lazy(() => import("./components/Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
      suspense: true
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <div
      className="m-0 min-h-screen p-0"
      style={{
        background: `url(${IMAGES_URL}/pets/wallpaperB.jpg)`,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🐶</h2>
            </div>
          }
        >
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <header className="mb-10 w-full bg-gradient-to-b from-blue-400 to-slate-400 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
};

export default  App;


