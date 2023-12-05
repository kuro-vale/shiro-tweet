import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/layouts/app-layout";
import "./index.css";
import "./override.css";
import {ConfigProvider, Spin, theme} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/home";
import NotFound from "./pages/404";
import AuthProvider from "./components/auth-provider";
import {LoadingOutlined} from "@ant-design/icons";
import {
  COMMON_FOLLOWERS_ROUTE,
  HOME_ROUTE,
  LANDING_ROUTE,
  LIKES_ROUTE,
  NOT_FOUND_ROUTE,
  REPLIES_ROUTE,
  RETWEETS_ROUTE,
  TOKEN_KEY,
  TWEET_DETAILS,
  USER_FOLLOWERS_ROUTE,
  USER_FOLLOWING_ROUTE,
  USER_ROUTE
} from "./constants";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import TweetDetails from "./pages/tweet-details";
import UserPage from "./pages/user/user-page";
import UserIndex from "./pages/user/user-index";
import UserRetweets from "./pages/user/user-retweets";
import UserLikes from "./pages/user/user-likes";
import UserReplies from "./pages/user/user-replies";
import UserCommonFollowers from "./pages/user/user-common-followers";
import UserFollowers from "./pages/user/user-followers";
import UserFollowing from "./pages/user/user-following";
import UserFollowTabs from "./components/users/user-follow-tabs";

Spin.setDefaultIndicator(<LoadingOutlined style={{fontSize: 40}} spin/>);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API,
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      UserQueries: {
        keyFields: []
      }
    }
  })
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
          },
          Layout: {
            siderBg: "black",
          },
          Spin: {
            colorPrimary: "var(--color-primary)"
          },
          Progress: {
            defaultColor: "var(--color-primary)",
            circleTextColor: "var(--color-secondary)"
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
                <Route path={TWEET_DETAILS} element={<TweetDetails/>}/>
                <Route path={USER_ROUTE} element={<UserPage/>}>
                  <Route path="" element={<UserIndex/>}/>
                  <Route path={REPLIES_ROUTE} element={<UserReplies/>}/>
                  <Route path={RETWEETS_ROUTE} element={<UserRetweets/>}/>
                  <Route path={LIKES_ROUTE} element={<UserLikes/>}/>
                  <Route element={<UserFollowTabs/>}>
                    <Route path={COMMON_FOLLOWERS_ROUTE} element={<UserCommonFollowers/>}/>
                    <Route path={USER_FOLLOWERS_ROUTE} element={<UserFollowers/>}/>
                    <Route path={USER_FOLLOWING_ROUTE} element={<UserFollowing/>}/>
                  </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
                <Route path={NOT_FOUND_ROUTE} element={<NotFound/>}/>
              </Route>

            </Routes>
          </AuthProvider>
        </ApolloProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
