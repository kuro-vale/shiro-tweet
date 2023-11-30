import TimelineLayout from "../components/layouts/timeline-layout";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {ArrowLeftOutlined, CalendarOutlined} from "@ant-design/icons";
import {Avatar, Tabs, TabsProps, Tag, Typography} from "antd";
import Aside from "../components/menus/aside";
import {useQuery} from "@apollo/client";
import {GetUserData, User} from "../types";
import {GET_USER_QUERY} from "../graphql/queries";
import ErrorResult from "../components/error-result";
import {getMonthAndYear} from "../utils";
import UserFollowStats from "../components/users/user-follow-stats";
import {useAuth} from "../hooks";
import {useState} from "react";
import FollowButton from "../components/users/follow-button";
import CommonFollowers from "../components/users/common-followers";
import {LIKES_ROUTE, RETWEETS_ROUTE, USER_ROUTE} from "../constants";

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

function UserPage() {
  const {username} = useParams();
  const location = useLocation();
  const {user: currentUser} = useAuth();
  const navigate = useNavigate();
  const {error, data} = useQuery<GetUserData>(GET_USER_QUERY, {
    variables: {
      username
    },
    fetchPolicy: "no-cache"
  });
  if (error) return (<ErrorResult message={error.message}/>);
  const user = data?.UserQueries.userByUsername;
  const items: TabsProps["items"] = [{
    key: USER_ROUTE.replace(":username", user?.username || ""),
    label: "Tweets"
  }, {
    key: RETWEETS_ROUTE.replace(":username", user?.username || ""),
    label: "Retweets"
  }, {
    key: LIKES_ROUTE.replace(":username", user?.username || ""),
    label: "Likes",
  }];

  return (
    <>
      <TimelineLayout>
        <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md h-14 flex items-center pl-3">
          <button
            type="button" className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-lg"/>
          </button>
          <div className="flex flex-col">
            <Text strong className="text-xl">{username}</Text>
            <Text className="text-[13px] text-secondary">{`${user ? user.tweets + " tweets" : ""}`}</Text>
          </div>
        </div>
        <div className="w-full h-[200px] bg-gray">
          <img src={`https://picsum.photos/seed/${username}1/600/200`} alt={username + " banner"}/>
        </div>
        <div className="flex justify-between mx-4 mb-3">
          <Avatar
            src={`https://picsum.photos/seed/${username}/400/`}
            size={138}
            alt={username + " photo"}
            className="border-[3px] border-black -mt-[70px] bg-gray"
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
            {currentUser?.id !== user.id && <CommonFollowers userId={user.id}/>}
          </div>
          <Tabs
            defaultActiveKey={location.pathname}
            items={items}
            onTabClick={k => navigate(k, {replace: true})}
          />
          <Outlet/>
        </>}
        {user === null && <ErrorResult message="This account doesn’t exist"/>}
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default UserPage;