import {ReactNode} from "react";
import {Avatar, Popover, Tag, Typography} from "antd";
import {User} from "../../types";
import FollowButton from "./follow-button";
import {useAuth} from "../../hooks";
import CommonFollowers from "./common-followers";
import {Link} from "react-router-dom";

const {Text} = Typography;
type UserPopoverProps = {
  children: ReactNode,
  user: User,
  isFollowedByYou: boolean,
  setIsFollowedByYou: (v: boolean) => void,
}


function UserPopover({children, user, isFollowedByYou, setIsFollowedByYou}: UserPopoverProps) {
  const {user: currentUser} = useAuth();

  // TODO: link to profile
  // TODO: correct links
  return (
    <Link to={"/"} className="w-fit">
      <Popover
        content={
          <div className="flex flex-col p-1">
            <div className="flex w-full justify-between">
              <Link to={"/"}>
                <Avatar src={`https://picsum.photos/seed/${user.username}/400/`} size={60}/>
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
              <Link to={"/"} className="w-fit">
                <Text strong className="hover:underline">{user.username}</Text>
              </Link>
              <Text className="text-secondary">
                <Link to={"/"}>
                  @{user.username}
                </Link>
                {user.isFollowingYou &&
                  <Tag className="text-[11px] bg-tag h-4 border-0 self-center text-secondary font-bold ml-1"
                       bordered={false}>
                    Follows you
                  </Tag>}
              </Text>
            </div>
            <div className="mt-3">
              <Link to={"/following"} className="hover:text-white hover:underline">
                <Text>{user.following}</Text>
                <Text className="text-secondary"> Following</Text>
              </Link>
              <Link to={"/followers"} className="ml-5 hover:text-white hover:underline">
                <Text>{user.followers}</Text>
                <Text className="text-secondary"> Followers</Text>
              </Link>
            </div>
            {currentUser?.id !== user.id &&
              <CommonFollowers userId={user.id}/>}
          </div>}
        destroyTooltipOnHide={true}
      >
        {children}
      </Popover>
    </Link>
  );
}

export default UserPopover;