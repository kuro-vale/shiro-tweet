import {User} from "../../types";
import {Avatar, Tag, Typography} from "antd";
import {useAuth} from "../../hooks";
import FollowButton from "./follow-button";
import UserPopover from "./user-popover";
import {useState} from "react";

const {Text} = Typography;

type UserCardProps = {
  user: User
}

function UserCard({user}: UserCardProps) {
  const {user: currentUser} = useAuth();
  const [isFollowedByYou, setIsFollowedByYou] = useState(user.isFollowedByYou);
  if (user.id === currentUser?.id) return (<></>);

  // TODO: redirect to user profile on click
  return (
    <div className="flex flex-row px-4 py-3 h-16 w-full justify-between hover:bg-hover-gray">
      <div className="flex">
        <UserPopover
          user={user}
          isFollowedByYou={isFollowedByYou}
          setIsFollowedByYou={setIsFollowedByYou}
        >
          <Avatar src={`https://picsum.photos/seed/${user.username}/400/`} size="large" className="bg-gray"/>
        </UserPopover>
        <div className="flex flex-col ml-3">
          <UserPopover
            user={user}
            isFollowedByYou={isFollowedByYou}
            setIsFollowedByYou={setIsFollowedByYou}
          >
            <Text strong className="h-[18px] hover:underline">{user.username}</Text>
          </UserPopover>
          <div className="flex flex-shrink">
            <UserPopover
              user={user}
              isFollowedByYou={isFollowedByYou}
              setIsFollowedByYou={setIsFollowedByYou}
            >
              <div className="h-[18px] overflow-y-hidden">
                <Text className="text-secondary mr-1">@{user.username}</Text>
              </div>
            </UserPopover>
            {user.isFollowingYou &&
              <Tag className="text-[11px] bg-tag h-3 border-0 self-center text-secondary font-bold px-0.5 pb-0.5"
                   bordered={false}>
                Follows you
              </Tag>}
          </div>
        </div>
      </div>
      <FollowButton
        user={user}
        confirmUnfollow={true}
        isFollowedByYou={isFollowedByYou}
        setIsFollowedByYou={setIsFollowedByYou}
      />
    </div>
  );
}

export default UserCard;