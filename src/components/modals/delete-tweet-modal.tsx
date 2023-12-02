import {ModalProps} from "../../types";
import {Button, Modal, Typography} from "antd";

const {Title, Text} = Typography;

type DeleteTweetModalProps = {
  onDelete: () => void,
} & ModalProps

function DeleteTweetModal({open, onClose, onDelete}: DeleteTweetModalProps) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      centered
      open={open}
      width={300}
      onCancel={onClose}
      footer={null}
      closeIcon={null}
      destroyOnClose={true}
    >
      <Title level={4} className="mt-[10px]">Delete Tweet?</Title>
      <Text className="text-secondary">This can’t be undone and it will be removed from your profile, the timeline of
        any accounts that follow you,
        and from search results.
      </Text>
      <Button
        shape="round"
        className="w-[244px] h-[45px] my-[6px] mx-0 hover:bg-red bg-red mt-6"
        onClick={handleDelete}
      >
        <Text strong>Delete</Text>
      </Button>
      <Button
        shape="round"
        className="w-[244px] h-[45px] my-[6px] mx-0 bg-black hover:bg-hover-black"
        onClick={onClose}
      >
        <Text strong>Cancel</Text>
      </Button>
    </Modal>
  );
}

export default DeleteTweetModal;