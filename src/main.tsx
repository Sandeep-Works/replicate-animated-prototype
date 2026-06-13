import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import RightFanApp from "./app/RightFanApp.tsx";
import "./styles/index.css";

// ?v=right  →  right-edge fan variant
// (default) →  bottom fan (original)
const variant = new URLSearchParams(window.location.search).get("v");
const Root = variant === "right" ? RightFanApp : App;

createRoot(document.getElementById("root")!).render(<Root />);
