import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./views/home/HomePage";
import { StartPage } from "./views/start/StartPage";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

