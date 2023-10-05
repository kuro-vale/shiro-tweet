import {AuthRequest, ModalProps} from "../../types";
import {Button, Form, Input, Modal, Spin, Typography} from "antd";
import "./auth-modal.css";
import {useAuth} from "../../hooks";
import {useState} from "react";

const {Title, Text} = Typography;

function RegisterModal(props: ModalProps) {
  const [form] = Form.useForm<AuthRequest>();
  const {onRegister} = useAuth();
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    form.resetFields();
    props.onClose();
  };

  const onFinish = async () => {
    const valid = await form.validateFields().then(() => true).catch(() => false);
    if (valid) {
      setLoading(true);
      await onRegister(form.getFieldsValue());
      setLoading(false);
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
      closable={!loading}
    >
      <Spin
        wrapperClassName="bg-black"
        spinning={loading}
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
          <Button shape="round" className="bg-primary last-button btn-primary-hover" onClick={onFinish}>
            <Text strong style={{color: "white", fontSize: "17px"}}>Sign up</Text>
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
}

export default RegisterModal;