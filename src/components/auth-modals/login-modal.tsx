import {Button, Divider, Form, Input, Modal, Spin, Typography} from "antd";
import "./auth-modal.css";
import React, {useState} from "react";
import {useAuth} from "../../hooks";
import {AuthRequest, LoginModalProps} from "../../types";
import GoogleIcon from "../icons/google-icon";
import AppleIcon from "../icons/apple-icon";
import {REGISTER_ROUTE} from "../../constants";

const {Title, Text, Link} = Typography;

function LoginModal(props: LoginModalProps) {
  const [form] = Form.useForm<AuthRequest>();
  const [lastStep, setLastStep] = useState(false);
  const {onLogin} = useAuth();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await onLogin(form.getFieldsValue());
      setLoading(false);
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
      closable={!loading}
    >
      <Spin
        wrapperClassName="bg-black"
        spinning={loading}
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
          <Form.Item<AuthRequest>
            name="username"
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
              <Form.Item<AuthRequest>
                name="password"
                rules={[
                  {required: true, message: "Please enter your password"},
                  {min: 5, message: "Password must be at least 5 characters"}
                ]}
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
            <Link href={REGISTER_ROUTE} className="color-primary">Sign up</Link></Text>
        </Form>
      </Spin>
    </Modal>
  );
}

export default LoginModal;