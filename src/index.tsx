import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/app-layout";
import "./index.css";
import "./override.css";
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
          colorText: "var(--color-white-light)",
          colorBgContainer: "black",
          colorSplit: "var(--color-gray)",
        },
        components: {
          Menu: {
            itemSelectedColor: "var(--color-white-light)",
            itemDisabledColor: "var(--color-white-light)",
            horizontalItemSelectedColor: "var(--color-white)",
            iconSize: 26,
            iconMarginInlineEnd: 15,
            collapsedIconSize: 26,
          },
          Typography: {
            colorLink: "var(--color-secondary)",
            colorLinkHover: "var(--color-secondary)",
            colorLinkActive: "var(--color-secondary)",
            linkHoverDecoration: "underline",
            linkFocusDecoration: "underline"
          },
          Modal: {
            contentBg: "black",
            headerBg: "black",
            colorBgMask: "var(--color-bg-mask)",
          },
          Input: {
            colorBorder: "var(--color-gray)",
            activeBorderColor: "var(--color-primary)",
            boxShadow: "var(--color-primary) 0 0 0 1px",
            colorTextPlaceholder: "var(--color-secondary)",
          },
          Result: {
            colorInfo: "var(--color-primary)"
          }
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
