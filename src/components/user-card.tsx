import {User} from "../types";
import {Avatar, Button, Tag, Typography} from "antd";
import {useState} from "react";

const {Text} = Typography;

type UserCardProps = {
  user: User
}

function UserCard(props: UserCardProps) {
  const [unfollow, setUnfollow] = useState(false);
  const handleHover = () => {
    setUnfollow(!unfollow);
  };

  return (
    <div className="flex flex-row px-4 py-3 h-16 w-full justify-between hover:bg-hover-gray">
      <div className="flex">
        <Avatar src={`https://picsum.photos/seed/${props.user.username}/400/`} size="large"/>
        <div className="flex flex-col ml-3">
          <Text strong className="h-[18px]">{props.user.username}</Text>
          <div className="flex flex-shrink">
            <Text className="text-secondary h-[18px] overflow-hidden mr-1">@{props.user.username}</Text>
            {props.user.isFollowingYou &&
              <Tag className="text-[11px] bg-tag h-3 border-0 self-center text-secondary font-bold" bordered={false}>
                Follows you
              </Tag>}
          </div>
        </div>
      </div>
      {/*TODO: make these buttons work*/}
      {props.user.isFollowedByYou ?
        <Button
          shape="round"
          className="bg-black hover:bg-hover-red transition-none h-[34px] w-24 self-center"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <Text strong
                className={`${unfollow ? "text-red" : "text-white"} text-sm`}>{unfollow ? "Unfollow" : "Following"}</Text>
        </Button> :
        <Button shape="round" className="bg-white hover:bg-hover-white transition-none h-[34px] w-20 self-center">
          <Text strong className="text-black text-sm">Follow</Text>
        </Button>}
    </div>
  );
}

export default UserCard;