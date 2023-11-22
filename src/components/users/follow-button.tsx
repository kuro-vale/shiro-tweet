import {Button, message, Typography} from "antd";
import {useMutation} from "@apollo/client";
import {FOLLOW_MUTATION, UNFOLLOW_MUTATION} from "../../graphql/mutations";
import {handleError} from "../../utils";
import {User} from "../../types";
import UnfollowModal from "../modals/unfollow-modal";
import {useState} from "react";

const {Text} = Typography;
type FollowButtonProps = {
  user: User,
  confirmUnfollow: boolean,
  isFollowedByYou: boolean,
  setIsFollowedByYou: (v: boolean) => void
}

function FollowButton({user, confirmUnfollow, isFollowedByYou, setIsFollowedByYou}: FollowButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [v, setValues] = useState({
    followingWhiteButton: false,
    unfollowHover: false,
    unfollowModal: false
  });
  const [unfollow] = useMutation(UNFOLLOW_MUTATION);
  const [follow] = useMutation(FOLLOW_MUTATION);

  const onFollow = async () => {
    try {
      setValues({...v, followingWhiteButton: true, unfollowHover: false});
      setIsFollowedByYou(true);
      await follow({variables: {followId: user.id}});
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  const onUnfollow = async () => {
    try {
      setValues({...v, unfollowModal: false});
      setIsFollowedByYou(false);
      await unfollow({variables: {unFollowId: user.id}});
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  return (
    <>
      {contextHolder}
      {confirmUnfollow &&
        <UnfollowModal
          open={v.unfollowModal}
          onClose={() => setValues({...v, unfollowModal: false})}
          onUnfollow={onUnfollow}
          username={user.username}
        />
      }
      {isFollowedByYou
        // Unfollow button
        ? <Button
          shape="round"
          className={`${v.followingWhiteButton ? "following-white border-none" : ""} bg-black hover:bg-hover-red transition-none h-[34px] w-24 self-center`}
          onMouseEnter={() => setValues({...v, unfollowHover: true})}
          onMouseLeave={() => setValues({...v, unfollowHover: false, followingWhiteButton: false})}
          onClick={() => confirmUnfollow ? setValues({...v, unfollowModal: true}) : onUnfollow()}
        >
          <Text strong className={`${v.unfollowHover ? "text-red" : "text-white"} text-sm`}>
            {v.unfollowHover ? "Unfollow" : "Following"}
          </Text>
        </Button>
        // Follow button
        : <Button
          shape="round"
          className="bg-white hover:bg-hover-white transition-none h-[34px] w-20 self-center"
          onClick={onFollow}
        >
          <Text strong className="text-black text-sm">Follow</Text>
        </Button>
      }
    </>
  );
}

export default FollowButton;