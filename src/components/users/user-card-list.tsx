import {useQuery} from "@apollo/client";
import {UserQueryData} from "../../types";
import {WHO_USER_QUERY} from "../../graphql/queries";
import {Card, Spin} from "antd";
import ErrorResult from "../error-result";
import UserCard from "./user-card";

function UserCardList() {
  const {loading, error, data} = useQuery<UserQueryData>(WHO_USER_QUERY, {fetchPolicy: "no-cache"});
  if (error) return (<div><ErrorResult message={error.message}/></div>);

  const userList = data?.UserQueries.searchUsers.map(user =>
    <UserCard user={user} key={user.id}/>
  );

  return (
    <Card title="Who to follow" bordered={false} className="bg-info my-4 w-[348px] lg:w-[288px]">
      <Spin spinning={loading} className="w-[350px] h-[300px] flex justify-center items-center">
        {userList}
      </Spin>
    </Card>
  );
}

export default UserCardList;