import {DocumentNode, useQuery} from "@apollo/client";
import {User, UserQueryData} from "../../types";
import ErrorResult from "../error-result";
import UserCard from "./user-card";
import InfiniteScroll from "react-infinite-scroll-component";
import {COMMON_FOLLOWERS_QUERY, USER_FOLLOWERS_QUERY, USER_FOLLOWING_QUERY} from "../../graphql/queries";
import {Spin} from "antd";
import {ReactElement, useEffect, useState} from "react";

type UserListProps = {
  query: DocumentNode,
  user: User
}

function UserList({query, user}: UserListProps) {
  const [userCards, setUserCards] = useState<ReactElement[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const {data, loading, error} = useQuery<UserQueryData>(query, {
    variables: {
      cursor,
      userId: user.id,
    },
    fetchPolicy: "no-cache"
  });
  let userList: User[] | undefined;
  switch (query) {
    case COMMON_FOLLOWERS_QUERY:
      userList = data?.UserQueries.followersYouMayKnow;
      break;
    case USER_FOLLOWERS_QUERY:
      userList = data?.UserQueries.followers;
      break;
    case USER_FOLLOWING_QUERY:
      userList = data?.UserQueries.following;
      break;
  }
  useEffect(() => {
    if (userList) {
      setUserCards(cards => [...cards,
        ...userList!.map(u => <UserCard user={u} key={u.id}/>)]);
    }
  }, [userList]);
  if (loading && userCards.length === 0) return (<Spin spinning={loading} className="min-h-[30vh]">
    <div/>
  </Spin>);
  if (error) return (<ErrorResult error={error}/>);

  const handleNext = () => {
    const lastUser = userList?.[userList.length - 1];
    if (lastUser) setCursor(lastUser.id);
  };

  return (
    <InfiniteScroll
      next={handleNext}
      hasMore={userList?.length === 10}
      loader={<Spin>
        <div className="min-h-[30vh]"/>
      </Spin>}
      dataLength={userCards.length || 0}
      style={{overflow: "hidden"}}
      endMessage={<div className="min-h-[30vh]"/>}
    >
      <ul>
        {userCards}
      </ul>
    </InfiniteScroll>
  );
}

export default UserList;