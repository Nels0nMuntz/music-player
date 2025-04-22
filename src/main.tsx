import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import { TracksPage, } from "@/pages/tracks";
import { Providers } from "@/app/providers";
import { Toaster } from "@/shared/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <TracksPage />
    </Providers>
    <Toaster />
  </StrictMode>,
);
