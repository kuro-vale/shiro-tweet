import {Button, Modal, Typography} from "antd";
import {ModalProps} from "../../types";

const {Text} = Typography;

type UnfollowModalProps = {
  onUnfollow: () => void,
  username: string,
} & ModalProps;

function UnfollowModal(props: UnfollowModalProps) {
  return (
    <Modal
      open={props.open}
      onCancel={props.onClose}
      width={320}
      closeIcon={null}
      footer={null}
      centered
      destroyOnClose={true}
    >
      <div className="flex flex-col p-3">
        <Text strong className="text-xl py-2">Unfollow @{props.username}?</Text>
        <Text className="text-secondary mb-6">
          Their posts will no longer show up in your Following timeline. You can still view their profile.
        </Text>
        <Button
          shape="round"
          className="w-[244px] h-[45px] my-[6px] mx-0 hover:bg-hover-white bg-white"
          onClick={props.onUnfollow}
        >
          <Text strong className="text-black">Unfollow</Text>
        </Button>
        <Button
          shape="round"
          className="w-[244px] h-[45px] my-[6px] mx-0 bg-black hover:bg-hover-black"
          onClick={props.onClose}>
          <Text strong>Cancel</Text>
        </Button>
      </div>
    </Modal>
  );
}

export default UnfollowModal;