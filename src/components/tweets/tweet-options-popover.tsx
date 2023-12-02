import {Tweet} from "../../types";
import {message, Popover, Typography} from "antd";
import {useState} from "react";
import {DeleteOutlined, EllipsisOutlined} from "@ant-design/icons";
import DeleteTweetModal from "../modals/delete-tweet-modal";
import {useMutation} from "@apollo/client";
import {DELETE_MUTATION} from "../../graphql/mutations";
import {handleError} from "../../utils";

const {Text} = Typography;
type TweetOptionsPopoverProps = {
  tweet: Tweet,
  onDelete: () => void,
}

function TweetOptionsPopover({tweet, onDelete}: TweetOptionsPopoverProps) {
  const [openPopover, setOpenPopover] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteTweet] = useMutation(DELETE_MUTATION);
  const onOpenDelete = () => {
    setOpenPopover(false);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTweet({
        variables: {tweetId: tweet.id}
      });
      onDelete();
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  return (
    <>
      {contextHolder}
      <div onClick={e => e.stopPropagation()}>
        <DeleteTweetModal open={openDelete} onClose={() => setOpenDelete(false)} onDelete={handleDelete}/>
        <Popover
          content={
            <div className="p-1 hover:bg-hover-gray cursor-pointer text-red" onClick={onOpenDelete}>
              <DeleteOutlined className="text-lg"/>
              <Text strong className="ml-3" style={{color: "inherit"}}>Delete</Text>
            </div>
          }
          open={openPopover}
          trigger="click"
          onOpenChange={setOpenPopover}
          destroyTooltipOnHide={true}
        >
          <EllipsisOutlined className="text-xl text-secondary"/>
        </Popover>
      </div>
    </>
  );
}

export default TweetOptionsPopover;