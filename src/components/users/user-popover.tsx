import {ReactNode} from "react";
import {Avatar, Popover} from "antd";
import {User} from "../../types";
import FollowButton from "./follow-button";
import {useAuth} from "../../hooks";

type UserPopoverProps = {
  children: ReactNode,
  user: User,
  isFollowedByYou: boolean,
  setIsFollowedByYou: (v: boolean) => void,
}


function UserPopover({children, user, isFollowedByYou, setIsFollowedByYou}: UserPopoverProps) {
  const {user: currentUser} = useAuth();

  // TODO: finish content
  return (
    <Popover
      mouseEnterDelay={.5}
      content={<div className="flex">
        <Avatar src={`https://picsum.photos/seed/${user.username}/400/`} size="large"/>
        {currentUser?.id !== user.id &&
          <FollowButton
            user={user}
            confirmUnfollow={false}
            isFollowedByYou={isFollowedByYou}
            setIsFollowedByYou={setIsFollowedByYou}
          />}
      </div>}
      destroyTooltipOnHide={true}
    >
      {children}
    </Popover>
  );
}

export default UserPopover;