import {ArrowLeftOutlined, CalendarOutlined} from "@ant-design/icons";
import {getMonthAndYear, shortNumber} from "../../utils";
import {Avatar, Tabs, TabsProps, Tag, Typography} from "antd";
import {User} from "../../types";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LIKES_ROUTE, REPLIES_ROUTE, RETWEETS_ROUTE, USER_ROUTE} from "../../constants";
import {useState} from "react";
import FollowButton from "./follow-button";
import {useAuth} from "../../hooks";
import {useMediaQuery} from "react-responsive";
import UserFollowStats from "./user-follow-stats";
import CommonFollowers from "./common-followers";
import ErrorResult from "../error-result";

const {Text} = Typography;

const FollowButtonState = ({user}: { user: User }) => {
  const [isFollowedByYou, setIsFollowedByYou] = useState(user.isFollowedByYou);

  return (
    <div className="mt-3">
      <FollowButton
        user={user!}
        confirmUnfollow={true}
        isFollowedByYou={isFollowedByYou}
        setIsFollowedByYou={setIsFollowedByYou}
        xl={true}
      />
    </div>
  );
};

function UserProfile({user}: { user?: User | null }) {
  const {username} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const likesRoute = LIKES_ROUTE.replace(":username", user?.username || "");
  const {user: currentUser} = useAuth();
  const isMobile = useMediaQuery({maxWidth: 500});
  const items: TabsProps["items"] = [{
    key: USER_ROUTE.replace(":username", user?.username || ""),
    label: "Tweets"
  }, {
    key: REPLIES_ROUTE.replace(":username", user?.username || ""),
    label: "Replies"
  }, {
    key: RETWEETS_ROUTE.replace(":username", user?.username || ""),
    label: "Retweets"
  }, {
    key: "0",
    label: "Media",
    disabled: true
  }, {
    key: likesRoute,
    label: "Likes",
  }];
  if (isMobile) items.splice(3, 1);

  return (
    <>
      <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md h-14 flex items-center pl-3">
        <button
          type="button" className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-9"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined className="text-lg"/>
        </button>
        <div className="flex flex-col">
          <Text strong className="text-xl">{username}</Text>
          {!!user && <Text className="text-[13px] text-secondary">
            {location.pathname === likesRoute ? `${shortNumber(user.hearts!)} likes` : `${shortNumber(user.tweets!)} tweets`}
          </Text>}
        </div>
      </div>
      <div className="w-full bg-gray">
        <img
          width={600}
          height={200}
          src={`https://picsum.photos/seed/${username}1/600/200`} alt={username + " banner"}
        />
      </div>
      <div className="flex justify-between mx-4 mb-3">
        <Avatar
          src={`https://picsum.photos/seed/${username}/400/`}
          size={isMobile ? 90 : 138}
          alt={username + " photo"}
          className={`${isMobile ? "-mt-[42px]" : "-mt-[70px]"} border-[3px] border-black bg-gray`}
        />
        {user && currentUser!.id !== user.id &&
          <FollowButtonState user={user}/>
        }
      </div>
      {!!user && <>
        <div className="flex flex-col ml-4 mb-4">
          <Text strong className="text-xl">{username}</Text>
          <Text className="text-secondary mb-3">
            @{username}
            {user.isFollowingYou &&
              <Tag className="text-[11px] bg-tag h-4 border-0 self-center text-secondary font-bold px-1 ml-1"
                   bordered={false}>
                Follows you
              </Tag>}
          </Text>
          <Text className="text-secondary"><CalendarOutlined/> Joined {getMonthAndYear(user.joined!)}</Text>
          <UserFollowStats user={user}/>
          {currentUser?.id !== user.id && <CommonFollowers user={user} showMessage={true}/>}
        </div>
        <Tabs
          defaultActiveKey={location.pathname}
          items={items}
          onTabClick={k => navigate(k, {replace: true})}
        />
      </>}
      {user === null && <ErrorResult error={undefined} message="This account doesn’t exist"/>}
    </>
  );
}

export default UserProfile;