import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/app-layout";
import "./index.css";
import {ConfigProvider, Spin, theme} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/landing/landing";
import Home from "./pages/home";
import NotFound from "./pages/404";
import AuthProvider from "./components/auth-provider";
import {LoadingOutlined} from "@ant-design/icons";

Spin.setDefaultIndicator(<LoadingOutlined style={{fontSize: 40}} spin/>);

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
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Landing/>}/>
            <Route path="/" element={<AppLayout/>}>
              <Route path="home" element={<Home/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
