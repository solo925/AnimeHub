import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import { ThemeProviderCustom } from "./contexts/ThemeContext.tsx"; 
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderCustom>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProviderCustom>
  </StrictMode>
);
