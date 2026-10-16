import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import "./styles/variables.css";
import AdminAuthProvider
  from "./shared/auth/AdminAuthProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </StrictMode>,
);
