import {AuthRequest, ModalProps} from "../../../types";
import {Button, Form, Input, Modal, Spin, Typography} from "antd";
import {useAuth} from "../../../hooks";
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
      footer={null}
      afterOpenChange={() => form.resetFields()}
      closable={!loading}
      className="min-w-[350px]"
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="register"
          className="flex flex-col items-start ml-[60px] sm:ml-0"
        >
          <Title level={2} className="mt-[50px]">Create your account</Title>
          <Form.Item<AuthRequest>
            name="username"
            rules={[
              {required: true, message: "Please enter your username"},
              {pattern: /^(?!.*\.\.)(?!.*\.$)\w[\w.-]+$/, message: "Enter a valid username"}
            ]}
          >
            <Input
              placeholder="Username"
              className="w-[410px] xs:w-[300px] h-[60px] bg-black placeholder-focus mt-4"
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
              className="w-[410px] xs:w-[300px] h-[60px] bg-black placeholder-focus"
              onKeyDown={e => e.key === "Enter" && onFinish()}
            />
          </Form.Item>
          <Button
            shape="round"
            className="bg-primary hover:bg-hover-primary w-[440px] h-[58px] transition-none mt-[215px] mb-5 xs:w-[300px]"
            onClick={onFinish}
          >
            <Text strong className="text-white text-[17px]">Sign up</Text>
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
}

export default RegisterModal;