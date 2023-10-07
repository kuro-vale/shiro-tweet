import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/app-layout";
import "./index.css";
import "./override.css"
import {ConfigProvider, Spin, theme} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/home";
import NotFound from "./pages/404";
import AuthProvider from "./components/auth-provider";
import {LoadingOutlined} from "@ant-design/icons";
import {HOME_ROUTE, LANDING_ROUTE} from "./constants";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

Spin.setDefaultIndicator(<LoadingOutlined style={{fontSize: 40}} spin/>);

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache()
});

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
          fontFamily: "TwitterChirp",
          colorText: "rgb(231, 233, 234)"
        }
      }}
    >
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Routes>

              <Route path={LANDING_ROUTE} element={<Landing/>}/>
              <Route element={<AppLayout/>}>
                <Route path={HOME_ROUTE} element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Route>

            </Routes>
          </AuthProvider>
        </ApolloProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
