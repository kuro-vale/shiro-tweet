import {Button, Divider, Form, Input, Modal, Typography} from "antd";
import "./LoginModal.css";
import {MouseEventHandler} from "react";
import {AppleOutlined, GoogleOutlined} from "@ant-design/icons";

const {Title, Text, Link} = Typography;

type LoginModalProps = {
  open: boolean,
  onClose: MouseEventHandler
}

function LoginModal(props: LoginModalProps) {
  return (
    <Modal
      centered
      open={props.open}
      width={600}
      title={
        <div className="header-logo">
          <img src="/logo.svg" alt="logo"/>
        </div>
      }
      onCancel={props.onClose}
      keyboard={false}
      maskClosable={false}
      maskStyle={{backgroundColor: "rgba(91, 112, 131, 0.4)"}}
      footer={null}
    >
      <Form
        name="login"
        className="login-form"
        onFinish={() => console.log("finish")}
      >
        <Title level={2} style={{marginTop: 10}}>Sign in to Kuro-Tweet</Title>
        <Button shape="round" className="bg-white form-button cursor-block next"
                icon={<GoogleOutlined style={{color: "black"}}/>}>
          <Text strong style={{color: "rgb(60, 64, 67)"}}>
            Sign up with Google
          </Text>
        </Button>
        <Button shape="round" className="bg-white form-button cursor-block next"
                icon={<AppleOutlined style={{color: "black"}}/>}>
          <Text strong style={{color: "black"}}>
            Sign up with Apple
          </Text>
        </Button>
        <Divider plain className="divider"/>
        <Form.Item
          name="username"
        >
          <Input
            placeholder="Username"
            className="form-input"
          />
        </Form.Item>
        <Button shape="round" className="form-button next bg-white">
          <Text strong style={{color: "black"}}>Next</Text>
        </Button>
        <Button shape="round" className="form-button login-button cursor-block">
          <Text strong style={{color: "white"}}>Forgot password?</Text>
        </Button>
        <Text className="color-secondary register-hook">Don't have an account? <Link className="color-primary">Sign up</Link></Text>
      </Form>
    </Modal>
  );
}

export default LoginModal;