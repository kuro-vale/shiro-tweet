import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout";
import "./index.css";
import {ConfigProvider, theme} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home";
import NotFound from "./pages/404";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontSize: 15,
          fontFamily: "TwitterChirp"
        }
      }}
    >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing/>}/>
          <Route path="/" element={<AppLayout/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
