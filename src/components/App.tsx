import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DEBUG,
  DEFAULT_CACHE_TIME,
  DEFAULT_STALE_TIME,
  IMAGES_URL,
} from "../helpers/constants";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
    },
  },
});

const App = () => {
  return (
    <div
      className="m-0 min-h-screen p-0"
      style={{
        background: `url(${IMAGES_URL}/pets/wallpaperB.jpg)`,
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🐶</h2>
              </div>
            }
          >
            <Provider store={store}>
              <header className="mb-10 w-full bg-gradient-to-b from-blue-400 to-slate-400 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Provider>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("Unable to find app container!");
}

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
