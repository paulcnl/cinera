import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Series from "./pages/programs";

const fetchPrograms = async () => {
  try {
    const response = await fetch("http://localhost:3310/api/programs");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des programmes");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/programs",
    element: <Series />,
    loader: fetchPrograms,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
