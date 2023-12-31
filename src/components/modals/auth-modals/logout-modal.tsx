import {Button, Modal, Typography} from "antd";
import {ModalProps} from "../../../types";
import {useAuth} from "../../../hooks";

const {Title, Text} = Typography;

function LogoutModal(props: ModalProps) {
  const {onLogout} = useAuth();

  return (
    <Modal
      centered
      open={props.open}
      width={300}
      title={
        <div className="w-full h-10">
          <img className="w-full h-full" src="/logo.svg" alt="logo"/>
        </div>
      }
      onCancel={props.onClose}
      footer={null}
      closeIcon={null}
      destroyOnClose={true}
    >
      <Title level={4} className="mt-[10px]">Log out of Kuro-Tweet?</Title>
      <Text className="text-secondary">You can always log back in at any time.</Text>
      <Button
        shape="round"
        className="w-[244px] h-[45px] my-[6px] mx-0 hover:bg-hover-white bg-white mt-6"
        onClick={onLogout}
      >
        <Text strong className="text-black">Log out</Text>
      </Button>
      <Button
        shape="round"
        className="w-[244px] h-[45px] my-[6px] mx-0 bg-black hover:bg-hover-black"
        onClick={props.onClose}>
        <Text strong>Cancel</Text>
      </Button>
    </Modal>
  );
}

export default LogoutModal;