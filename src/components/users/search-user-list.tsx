import {FilterUser, UserQueryData} from "../../types";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {SEARCH_USER_QUERY} from "../../graphql/queries";
import ErrorResult from "../error-result";
import UserCard from "./user-card";
import {Result, Spin} from "antd";

type SearchUserListProps = {
  filterProp?: FilterUser,
}

function SearchUserList({filterProp}: SearchUserListProps) {
  const [filter, setFilter] = useState<FilterUser>(filterProp || {username: ""});
  const {loading, error, data} = useQuery<UserQueryData>(SEARCH_USER_QUERY, {
    variables: {
      filter
    },
    fetchPolicy: "no-cache"
  });
  useEffect(() => {
    if (filterProp && filterProp?.username !== filter.username) {
      setFilter(filterProp);
    }
  }, [filter, filterProp]);

  if (loading) return (<Spin>
    <div className="h-[300px]"/>
  </Spin>);
  if (error) return (<div><ErrorResult error={error}/></div>);
  const userList = data?.UserQueries.searchUsers.map(user =>
    <UserCard user={user} key={user.id}/>
  );
  if (!loading && userList?.length === 0) {
    return (
      <Result
        title={`No results for "${filter.username}"`}
      />
    );
  }

  return (
    <ul className="w-full">
      {userList}
    </ul>
  );
}

export default SearchUserList;