import {Button, Modal, Typography} from "antd";
import {ModalProps} from "../../types";
import {useAuth} from "../../hooks";

const {Title, Text} = Typography;

function LogoutModal(props: ModalProps) {
  const {onLogout} = useAuth();

  return (
    <Modal
      centered
      open={props.open}
      width={300}
      title={
        <div className="header-logo">
          <img src="/logo.svg" alt="logo"/>
        </div>
      }
      onCancel={props.onClose}
      maskStyle={{backgroundColor: "rgba(91, 112, 131, 0.4)"}}
      footer={null}
      closeIcon={null}
    >
      <Title level={4} style={{marginTop: 10}}>Log out of Kuro-Tweet?</Title>
      <Text>You can always log back in at any time.</Text>
      <Button shape="round" className="logout-button btn-white-hover bg-white" onClick={onLogout}>
        <Text strong style={{color: "black"}}>Log out</Text>
      </Button>
      <Button shape="round" className="logout-button btn-black" onClick={props.onClose}>
        <Text strong>Cancel</Text>
      </Button>
    </Modal>
  );
}

export default LogoutModal;