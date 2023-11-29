import TimelineLayout from "../components/layouts/timeline-layout";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowLeftOutlined, CalendarOutlined} from "@ant-design/icons";
import {Avatar, Typography} from "antd";
import Aside from "../components/menus/aside";
import {useQuery} from "@apollo/client";
import {GetUserData} from "../types";
import {GET_USER_QUERY} from "../graphql/queries";
import ErrorResult from "../components/error-result";
import {getMonthAndYear} from "../utils";
import UserFollowStats from "../components/users/user-follow-stats";

const {Text} = Typography;

function User() {
  const {username} = useParams();
  const navigate = useNavigate();
  const {error, data} = useQuery<GetUserData>(GET_USER_QUERY, {
    variables: {
      username
    },
    fetchPolicy: "no-cache"
  });
  if (error) return (<ErrorResult message={error.message}/>);
  const user = data?.UserQueries.userByUsername;

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
        <img src={`https://picsum.photos/seed/${username}1/600/200`} alt={username + " banner"}/>
        <Avatar
          src={`https://picsum.photos/seed/${username}/400/`}
          size={138}
          alt={username + " photo"}
          className="ml-4 border-[3px] border-black -mt-[70px] mb-3"
        />
        {!!user && <>
          <div className="flex flex-col ml-4 mb-4">
            <Text strong className="text-xl">{username}</Text>
            <Text className="text-secondary mb-3">@{username}</Text>
            <Text className="text-secondary"><CalendarOutlined/> Joined {getMonthAndYear(user.joined!)}</Text>
            <UserFollowStats user={user}/>
          </div>
        </>}
        {user === null && <ErrorResult message="This account doesn’t exist"/>}
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default User;