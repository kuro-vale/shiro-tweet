import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout";
import "./index.css";
import {ConfigProvider, theme} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}
    >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout/>}/>

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
