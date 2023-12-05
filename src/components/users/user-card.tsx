import {User} from "../../types";
import {Avatar, Tag, Typography} from "antd";
import {useAuth} from "../../hooks";
import FollowButton from "./follow-button";
import UserPopover from "./user-popover";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {USER_ROUTE} from "../../constants";

const {Text} = Typography;

type UserCardProps = {
  user: User
}

function UserCard({user}: UserCardProps) {
  const {user: currentUser} = useAuth();
  const [isFollowedByYou, setIsFollowedByYou] = useState(user.isFollowedByYou);
  const navigate = useNavigate();
  if (user.id === currentUser?.id) return (<></>);
  const handleClick = () => {
    let selection = window.getSelection();
    if (!selection?.toString().trim()) {
      navigate(USER_ROUTE.replace(":username", user.username));
    }
  };

  return (
    <li
      className="flex flex-row px-4 py-3 h-16 w-full justify-between hover:bg-hover-gray cursor-pointer"
      onClick={handleClick}
    >
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
              <Tag className="text-[11px] bg-tag h-3 border-0 self-center text-secondary font-bold px-0.5 pb-[17px]"
                   bordered={false}>
                Follows you
              </Tag>}
          </div>
        </div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <FollowButton
          user={user}
          confirmUnfollow={true}
          isFollowedByYou={isFollowedByYou}
          setIsFollowedByYou={setIsFollowedByYou}
        />
      </div>
    </li>
  );
}

export default UserCard;