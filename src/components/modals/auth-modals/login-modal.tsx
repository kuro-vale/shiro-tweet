import {Button, Divider, Form, Input, Modal, Spin, Typography} from "antd";
import React, {useState} from "react";
import {useAuth} from "../../../hooks";
import {AuthRequest, ModalProps} from "../../../types";
import GoogleIcon from "../../icons/google-icon";
import AppleIcon from "../../icons/apple-icon";
import {REGISTER_ROUTE} from "../../../constants";

const {Title, Text, Link} = Typography;

function LoginModal(props: ModalProps) {
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
        <div className="w-full h-10">
          <img className="w-full h-full" src="/logo.svg" alt="logo"/>
        </div>
      }
      onCancel={onClose}
      keyboard={false}
      maskClosable={false}
      footer={null}
      closable={!loading}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="login"
          className={`flex flex-col ${lastStep ? "items-start ml-[60px] sm:ml-0" : "items-center"}`}
        >
          <Title level={2} className="mt-3">{lastStep ? "Enter your password" : "Sign in to Kuro-Tweet"}</Title>
          {!lastStep &&
            <>
              <Button shape="round"
                      className="bg-white w-[300px] h-11 my-3 transition-none cursor-not-allowed hover:bg-hover-white"
                      icon={<GoogleIcon/>}>
                <Text strong className="text-google">
                  Sign in with Google
                </Text>
              </Button>
              <Button shape="round"
                      className="bg-white w-[300px] h-11 my-3 transition-none cursor-not-allowed hover:bg-hover-white"
                      icon={<AppleIcon/>}>
                <Text strong className="text-black">
                  Sign in with Apple
                </Text>
              </Button>
              <Divider plain className="w-[300px] min-w-0"/>
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
              className={`h-[60px] bg-black placeholder-focus ${lastStep ? "w-[410px] xs:w-[300px]" : "w-[300px]"}`}
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
                  className="w-[410px] xs:w-[300px] h-[60px] bg-black placeholder-focus"
                  autoFocus
                  onKeyDown={e => e.key === "Enter" && onFinish()}
                />
              </Form.Item>
              <Button
                shape="round"
                className="bg-white hover:bg-hover-white w-[440px] h-[58px] transition-none mt-[215px] mb-5 xs:w-[300px]"
                onClick={onFinish}
              >
                <Text strong className="text-black text-[17px]">Log in</Text>
              </Button>
            </> :
            <>
              <Button shape="round" className="w-[300px] h-11 my-3 transition-none hover:bg-hover-white bg-white"
                      onClick={onNext}>
                <Text strong className="text-black">Next</Text>
              </Button>
              <Button shape="round"
                      className="w-[300px] h-11 my-3 transition-none bg-black hover:bg-hover-black cursor-not-allowed">
                <Text strong>Forgot password?</Text>
              </Button>
            </>
          }
          <Text className={`text-secondary w-[300px] ${lastStep ? "m-0" : "mt-10 mb-20"}`}>
            Don't have an account?&nbsp;
            <Link href={REGISTER_ROUTE} style={{color: "rgb(29, 155, 240)"}}>Sign up</Link>
          </Text>
        </Form>
      </Spin>
    </Modal>
  );
}

export default LoginModal;