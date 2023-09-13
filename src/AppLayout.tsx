import React, {useState} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";

const {Content, Sider} = Layout;

function AppLayout() {
  const [collapsed, setCollapse] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        className="sm-hidden"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "black",
          transition: "none"
        }}
        width="30vw"
        breakpoint="xl"
        collapsedWidth="15vw"
        onCollapse={(broken) => setCollapse(broken)}
      >

      </Sider>
      <Content className="ml-0__sm" style={{marginLeft: `${collapsed ? "15" : "30"}vw`}}>
        <Outlet/>
      </Content>
    </Layout>
  );
}

export default AppLayout;
