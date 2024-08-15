import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <ul>
        <Pet name="Luna" animal="Dog" breed="Havan ese" />
        <Pet name="Kiprian" animal="Cat" breed="Russian Blue" />
        <Pet name="Mickey" animal="Mice" breed="Disney Mouse" />
      </ul>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
