import {Button, Divider, Layout, Typography} from "antd";
import {useState} from "react";
import LoginModal from "../components/modals/auth-modals/login-modal";
import {useSearchParams} from "react-router-dom";
import AppleIcon from "../components/icons/apple-icon";
import GoogleIcon from "../components/icons/google-icon";
import RegisterModal from "../components/modals/auth-modals/register-modal";
import {useTitle} from "../hooks";

const {Footer, Content} = Layout;
const {Link, Text} = Typography;

function Landing() {
  useTitle("It’s what’s happening");
  const [search] = useSearchParams();
  const [openLogin, setOpenLogin] = useState(!!search.get("login"));
  const [openRegister, setOpenRegister] = useState(!!search.get("register"));

  return (
    <Layout className="h-screen ht:min-h-screen ht:h-full">
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)}/>
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)}/>
      <Content className="flex md:flex-col">
        <div className="w-3/5 h-full flex items-center md:w-2/5 md:h-1/6 md:mb-5 ht:w-1/2">
          <img className="w-full h-3/5" src="/logo.svg" alt="logo"/>
        </div>
        <div className="h-full flex justify-center items-start flex-col md:items-center md:self-center md:h-5/6">
          <Text strong className="text-6xl verdana sm:text-4xl my-12">Happening now</Text>
          <Text strong className="verdana text-3xl mb-8">Join today.</Text>
          <Button
            shape="round"
            className="w-[300px] h-11 my-3 transition-none cursor-not-allowed bg-white hover:bg-hover-white"
            icon={<GoogleIcon/>}
          >
            <Text strong className="text-google">
              Sign up with Google
            </Text>
          </Button>
          <Button
            shape="round"
            className="w-[300px] h-11 m-0 transition-none cursor-not-allowed bg-white hover:bg-hover-white"
            icon={<AppleIcon/>}
          >
            <Text strong className="text-black">
              Sign up with Apple
            </Text>
          </Button>
          <Divider className="w-[300px] min-w-0"/>
          <Button
            shape="round"
            className="w-[300px] h-11 m-0 transition-none bg-primary hover:bg-hover-primary"
            onClick={() => setOpenRegister(true)}
          >
            <Text strong>Create account</Text>
          </Button>
          <Text className="text-secondary text-xs mt-1">By signing up, you agree to be beautiful.</Text>
          <Text strong className="mt-[60px] text-lg">Already have an account?</Text>
          <Button
            shape="round"
            className="bg-black hover:bg-hover-login w-[300px] h-11 mt-[20px] transition-none"
            onClick={() => setOpenLogin(true)}
          >
            <Text strong className="text-primary">Sign in</Text>
          </Button>
        </div>
      </Content>
      <Footer className="flex flex-wrap justify-center px-4">
        <Link className="pr-4" href="https://github.com/kuro-vale/shiro-tweet" target="_blank">
          Repo</Link>
        <Link className="pr-4" href="https://x.com" target="_blank">
          Based on X</Link>
        <Link className="pr-4" href={process.env.REACT_APP_API} target="_blank">
          API</Link>
        <Link className="pr-4" href="https://github.com/kuro-vale" target="_blank">
          Github</Link>
        <Link className="pr-4" href="https://twitter.com/kuro_vale" target="_blank">
          Twitter</Link>
        <Link className="pr-4" href="https://twitter.com/_Silvervale_" target="_blank">
          Best girl</Link>
        <Link className="pr-4" href="https://www.linkedin.com/in/kurovale/" target="_blank">
          LinkedIn</Link>
        <Link className="pr-4" href="mailto:jsalcedo218@gmail.com" target="_blank">
          Gmail</Link>
        <Text className="text-secondary">
          @2023 kurovale</Text>
      </Footer>
    </Layout>
  );
}

export default Landing;