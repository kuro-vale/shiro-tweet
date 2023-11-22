import {ModalProps, Tweet} from "../../types";
import {Modal} from "antd";
import ComposeTweet from "../tweets/compose-tweet";
import ParentTweet from "../tweets/parent-tweet";


type ComposeModalProps = {
  tweet?: Tweet
} & ModalProps;

function ComposeModal({open, onClose, tweet}: ComposeModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="mt-14">
        {tweet && <ParentTweet tweet={tweet} replying={true}/>}
        <ComposeTweet onComplete={() => onClose()} tweet={tweet}/>
      </div>
    </Modal>
  );
}

export default ComposeModal;