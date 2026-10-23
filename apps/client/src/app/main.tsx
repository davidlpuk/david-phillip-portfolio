import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const path = window.location.pathname.replace(/(.)\/$/, "$1");

// Public routes ship as prerendered HTML (see scripts/prerender.mjs); attach
// to it instead of re-rendering. Any other route renders from scratch.
if (container.dataset.prerendered === path && container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  container.replaceChildren();
  createRoot(container).render(<App />);
}
