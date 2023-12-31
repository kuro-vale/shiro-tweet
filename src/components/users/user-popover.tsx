import {ReactNode} from "react";
import {Avatar, Popover, Tag, Typography} from "antd";
import {User} from "../../types";
import FollowButton from "./follow-button";
import {useAuth} from "../../hooks";
import CommonFollowers from "./common-followers";
import {Link} from "react-router-dom";
import UserFollowStats from "./user-follow-stats";
import {USER_ROUTE} from "../../constants";

const {Text} = Typography;
type UserPopoverProps = {
  children: ReactNode,
  user: User,
  isFollowedByYou: boolean,
  setIsFollowedByYou: (v: boolean) => void,
}


function UserPopover({children, user, isFollowedByYou, setIsFollowedByYou}: UserPopoverProps) {
  const {user: currentUser} = useAuth();
  const profileRoute = USER_ROUTE.replace(":username", user.username);

  return (
    <Link to={profileRoute} className="w-fit h-fit" onClick={e => e.stopPropagation()}>
      <Popover
        mouseEnterDelay={.3}
        content={
          <div className="flex flex-col p-1" onClick={e => e.stopPropagation()}>
            <div className="flex w-full justify-between">
              <Link to={profileRoute}>
                <Avatar src={`https://picsum.photos/seed/${user.username}/400/`} size={60} className="bg-gray"/>
              </Link>
              {currentUser?.id !== user.id &&
                <FollowButton
                  user={user}
                  confirmUnfollow={false}
                  isFollowedByYou={isFollowedByYou}
                  setIsFollowedByYou={setIsFollowedByYou}
                />}
            </div>
            <div className="flex flex-col">
              <Link to={profileRoute} className="w-fit">
                <Text strong className="hover:underline">{user.username}</Text>
              </Link>
              <Text className="text-secondary">
                <Link to={profileRoute}>
                  @{user.username}
                </Link>
                {user.isFollowingYou &&
                  <Tag className="text-[11px] bg-tag h-4 border-0 self-center text-secondary font-bold px-1 ml-1"
                       bordered={false}>
                    Follows you
                  </Tag>}
              </Text>
            </div>
            <UserFollowStats user={user}/>
            {currentUser?.id !== user.id &&
              <CommonFollowers user={user}/>}
          </div>}
        destroyTooltipOnHide={true}
      >
        {children}
      </Popover>
    </Link>
  );
}

export default UserPopover;