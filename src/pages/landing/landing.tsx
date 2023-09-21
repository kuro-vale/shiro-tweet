import {Button, Divider, Layout, Typography} from "antd";
import "./landing.css";
import {useState} from "react";
import LoginModal from "../../components/auth-modals/login-modal";
import {useSearchParams} from "react-router-dom";
import AppleIcon from "../../components/icons/apple-icon";
import GoogleIcon from "../../components/icons/google-icon";
import RegisterModal from "../../components/auth-modals/register-modal";

const {Footer, Content} = Layout;
const {Link, Text, Title} = Typography;

function Landing() {
  const [search] = useSearchParams();
  const [openLogin, setOpenLogin] = useState(!!search.get("login"));
  const [openRegister, setOpenRegister] = useState(!!search.get("register"));

  return (
    <Layout style={{height: "100vh"}}>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)}/>
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)}/>
      <Content className="main">
        <div className="logo">
          <img src="/logo.svg" alt="logo"/>
        </div>
        <div className="content">
          <Title className="big-title verdana">Happening now</Title>
          <Title className="verdana" level={2}>Join today.</Title>
          <Button shape="round" className="bg-white form-button cursor-block next" icon={<GoogleIcon/>}>
            <Text strong style={{color: "rgb(60, 64, 67)"}}>
              Sign up with Google
            </Text>
          </Button>
          <Button
            shape="round"
            className="bg-white form-button cursor-block next m-0" icon={<AppleIcon/>}
          >
            <Text strong style={{color: "black"}}>
              Sign up with Apple
            </Text>
          </Button>
          <Divider className="divider"/>
          <Button shape="round" className="bg-primary form-button m-0" onClick={() => setOpenRegister(true)}>
            <Text strong>Create account</Text>
          </Button>
          <Text className="color-secondary small-text">By signing up, you agree to be beautiful.</Text>
          <Title level={5} style={{marginTop: 60}}>Already have an account?</Title>
          <Button shape="round" className="login-button form-button" onClick={() => setOpenLogin(true)}>
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