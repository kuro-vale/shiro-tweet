import {User} from "../../types";
import {Avatar, Tag, Typography} from "antd";
import {useAuth} from "../../hooks";
import FollowButton from "./follow-button";

const {Text} = Typography;

type UserCardProps = {
  user: User
}

function UserCard(props: UserCardProps) {
  const {user} = useAuth();
  if (props.user.id === user?.id) return (<></>);

  return (
    <div className="flex flex-row px-4 py-3 h-16 w-full justify-between hover:bg-hover-gray">
      <div className="flex">
        <Avatar src={`https://picsum.photos/seed/${props.user.username}/400/`} size="large"/>
        <div className="flex flex-col ml-3">
          <Text strong className="h-[18px]">{props.user.username}</Text>
          <div className="flex flex-shrink">
            <Text className="text-secondary h-[18px] overflow-hidden mr-1">@{props.user.username}</Text>
            {props.user.isFollowingYou &&
              <Tag className="text-[11px] bg-tag h-3 border-0 self-center text-secondary font-bold p-0 m-0"
                   bordered={false}>
                Follows you
              </Tag>}
          </div>
        </div>
      </div>
      <FollowButton user={props.user} confirmUnfollow={true}/>
    </div>
  );
}

export default UserCard;