import { createBrowserRouter, Navigate } from "react-router-dom";
import { TracksPage } from "@/pages/tracks";
import { NotFoundPage } from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/tracks",
    element: <TracksPage />,
  },
  {
    path: "",
    element: <Navigate to="/tracks" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
