import {Modal, Typography} from "antd";
import {ModalProps} from "../../types";

const {Title} = Typography;

function LogoutModal(props: ModalProps) {
  // const {onLogout} = useAuth();

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
    </Modal>
  );
}

export default LogoutModal;