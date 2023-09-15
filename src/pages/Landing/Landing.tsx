import {Button, Divider, Layout, Typography} from "antd";
import "./Landing.css";

const {Footer, Content} = Layout;
const {Link, Text, Title} = Typography;

function Landing() {
  return (
    <Layout style={{height: "100vh"}}>
      <Content className="main">
        <div className="logo">
          <img src="/logo.svg" alt="logo"/>
        </div>
        <div className="content">
          <Title className="big-title verdana">Happening now</Title>
          <Title className="verdana" level={2}>Join today.</Title>
          <Divider style={{width: "300px", minWidth: "0"}}/>
          <Button shape="round" className="bg-primary register-button">
            <Text strong>Create account</Text>
          </Button>
          <Text className="color-secondary small-text">By signing up, you agree to the Cookie Use.</Text>
          <Divider style={{borderColor: "black"}}/>
          <Title level={5}>Already have an account?</Title>
          <Button shape="round" className="login-button">
            <Text strong className="color-primary">Sign in</Text>
          </Button>
        </div>
      </Content>
      <Footer className="socials">
        <Link className="color-secondary socials-link" href="https://github.com/kuro-vale/shiro-tweet" target="_blank">
          Repo</Link>
        <Link className="color-secondary socials-link" href="https://x.com" target="_blank">
          Based on X</Link>
        <Link className="color-secondary socials-link" href={process.env.REACT_APP_API} target="_blank">
          API</Link>
        <Link className="color-secondary socials-link" href="https://github.com/kuro-vale" target="_blank">
          Github</Link>
        <Link className="color-secondary socials-link" href="https://twitter.com/kuro_vale" target="_blank">
          Twitter</Link>
        <Link className="color-secondary socials-link" href="https://twitter.com/_Silvervale_" target="_blank">
          Best girl</Link>
        <Link className="color-secondary socials-link" href="https://www.linkedin.com/in/kurovale/" target="_blank">
          LinkedIn</Link>
        <Link className="color-secondary socials-link" href="mailto:jsalcedo218@gmail.com" target="_blank">
          Gmail</Link>
        <Text className="color-secondary">
          @2023 kurovale</Text>
      </Footer>
    </Layout>
  );
}

export default Landing;