import {AuthRequest, LoginModalProps} from "../../types";
import {Button, Form, Input, Modal, Typography} from "antd";
import "./auth-modal.css";
import {useAuth} from "../../hooks";

const {Title, Text} = Typography;

function RegisterModal(props: LoginModalProps) {
  const [form] = Form.useForm<AuthRequest>();
  const {onRegister} = useAuth();

  const onClose = () => {
    form.resetFields();
    props.onClose();
  };

  const onFinish = async () => {
    const valid = await form.validateFields().then(() => true).catch(() => false);
    if (valid) {
      props.onClose();
      await onRegister(form.getFieldsValue());
    }
  };

  return (
    <Modal
      centered
      open={props.open}
      width={600}
      onCancel={onClose}
      keyboard={false}
      maskClosable={false}
      maskStyle={{backgroundColor: "rgba(91, 112, 131, 0.4)"}}
      footer={null}
      afterOpenChange={() => form.resetFields()}
    >
      <Form
        form={form}
        name="register"
        className="login-form__last"
      >
        <Title level={2} style={{marginTop: 50}}>Create your account</Title>
        <Form.Item<AuthRequest>
          name="username"
          rules={[
            {required: true, message: "Please enter your username"},
            {pattern: /^(?!.*\.\.)(?!.*\.$)\w[\w.-]+$/, message: "Enter a valid username"}
          ]}
        >
          <Input
            placeholder="Username"
            className="form-input__last"
            style={{marginTop: 16}}
            autoFocus
          />
        </Form.Item>
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
            onKeyDown={e => e.key === "Enter" && onFinish()}
          />
        </Form.Item>
        <Button shape="round" className="bg-primary last-button next" onClick={onFinish}>
          <Text strong style={{color: "white", fontSize: "17px"}}>Sign up</Text>
        </Button>
      </Form>
    </Modal>
  );
}

export default RegisterModal;