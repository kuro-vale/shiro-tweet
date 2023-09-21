import {Button, Divider, Form, Input, Modal, Typography} from "antd";
import "./auth-modal.css";
import React, {useState} from "react";
import {useAuth} from "../../hooks";
import {LoginModalProps, UserRequest} from "../../types";
import GoogleIcon from "../icons/google-icon";
import AppleIcon from "../icons/apple-icon";

const {Title, Text, Link} = Typography;

function LoginModal(props: LoginModalProps) {
  const [form] = Form.useForm<UserRequest>();
  const [lastStep, setLastStep] = useState(false);
  const {onLogin} = useAuth();
  const onNext = async () => {
    const valid = await form.validateFields().then(() => true).catch(() => false);
    if (valid) {
      setLastStep(true);
    }
  };
  const onClose = () => {
    form.resetFields();
    setLastStep(false);
    props.onClose();
  };

  const onFinish = async () => {
    const valid = await form.validateFields().then(() => true).catch(() => false);
    if (valid) {
      onLogin(form.getFieldsValue());
    }
  };

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
      onCancel={onClose}
      keyboard={false}
      maskClosable={false}
      maskStyle={{backgroundColor: "rgba(91, 112, 131, 0.4)"}}
      footer={null}
    >
      <Form
        form={form}
        name="login"
        className={lastStep ? "login-form__last" : "login-form"}
      >
        <Title level={2} style={{marginTop: 10}}>{lastStep ? "Enter your password" : "Sign in to Kuro-Tweet"}</Title>
        {!lastStep &&
            <>
                <Button shape="round" className="bg-white form-button cursor-block next" icon={<GoogleIcon/>}>
                    <Text strong style={{color: "rgb(60, 64, 67)"}}>
                        Sign in with Google
                    </Text>
                </Button>
                <Button shape="round" className="bg-white form-button cursor-block next" icon={<AppleIcon/>}>
                    <Text strong style={{color: "black"}}>
                        Sign in with Apple
                    </Text>
                </Button>
                <Divider plain className="divider"/>
            </>
        }
        <Form.Item<UserRequest>
          name="Username"
          rules={[
            {required: true, message: "Please enter your username"},
            {pattern: /^(?!.*\.\.)(?!.*\.$)\w[\w.-]+$/, message: "Enter a valid username"}
          ]}
        >
          <Input
            disabled={lastStep}
            placeholder="Username"
            className={lastStep ? "form-input__last" : "form-input"}
            onKeyDown={e => e.key === "Enter" && onNext()}
          />
        </Form.Item>
        {lastStep ?
          <>
            <Form.Item<UserRequest>
              name="Password"
              rules={[{required: true, message: "Please enter your password"}, {min: 5}]}
            >
              <Input.Password
                placeholder="Password"
                className="form-input__last"
                autoFocus
                onKeyDown={e => e.key === "Enter" && onFinish()}
              />
            </Form.Item>
            <Button shape="round" className="bg-white last-button next" onClick={onFinish}>
              <Text strong style={{color: "black", fontSize: "17px"}}>Log in</Text>
            </Button>
          </> :
          <>
            <Button shape="round" className="form-button next bg-white" onClick={onNext}>
              <Text strong style={{color: "black"}}>Next</Text>
            </Button>
            <Button shape="round" className="form-button login-button cursor-block">
              <Text strong style={{color: "white"}}>Forgot password?</Text>
            </Button>
          </>
        }
        <Text className="color-secondary register-hook" style={lastStep ? {margin: 0} : undefined}>
          Don't have an account?&nbsp;
          <Link href="/?register=true" className="color-primary">Sign up</Link></Text>
      </Form>
    </Modal>
  );
}

export default LoginModal;