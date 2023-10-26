import {ModalProps} from "../../types";
import {Modal} from "antd";
import ComposeTweet from "../tweets/compose-tweet";

function ComposeModal(props: ModalProps) {
  return (
    <Modal
      open={props.open}
      onCancel={props.onClose}
      footer={null}
      width={600}
    >
      <div className="mt-10">
        <ComposeTweet onComplete={() => props.onClose()}/>
      </div>
    </Modal>
  );
}

export default ComposeModal;