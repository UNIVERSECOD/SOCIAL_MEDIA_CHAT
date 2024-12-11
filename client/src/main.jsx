import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./components/providers/theme-provider";
import { router } from "./router";
import "./styles/global.css";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer/>
  </ThemeProvider>
  </Provider>
);
