import {ModalProps, Tweet} from "../../types";
import {Avatar, Modal, Typography} from "antd";
import ComposeTweet from "../tweets/compose-tweet";
import {getDateMinimal} from "../../utils";

const {Text} = Typography;

type ComposeModalProps = {
  tweet?: Tweet
} & ModalProps;

function ComposeModal({open, onClose, tweet}: ComposeModalProps) {
  // TODO: after compose show blue notification with SHOW
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="mt-14">
        {tweet &&
          <article className="flex mb-3">
            <div>
              <Avatar
                src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
                size="large"
                alt={tweet.author.username + " photo"}
              />
              <div className="w-[2px] pt-1 pb-10 h-full mx-auto">
                <div className="bg-gray h-full"/>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <Text strong className="hover:underline">{tweet.author.username}</Text>
              <Text className="text-secondary"> @{tweet.author.username}</Text>
              <Text className="text-secondary"> · </Text>
              <Text className="text-secondary hover:underline">{getDateMinimal(tweet.createdAt)}</Text>
              <p><Text className="whitespace-pre-line">{tweet.body}</Text></p>
              <p className="py-4">
                <Text className="text-secondary">Replying to</Text>
                <Text className="text-primary"> @{tweet.author.username}</Text>
              </p>
            </div>
          </article>}
        <ComposeTweet onComplete={() => onClose()} tweet={tweet}/>
      </div>
    </Modal>
  );
}

export default ComposeModal;