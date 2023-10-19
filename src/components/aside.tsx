import {Card, Spin, Typography} from "antd";
import {useQuery} from "@apollo/client";
import {WHO_USER_QUERY} from "../graphql/queries";
import ErrorResult from "./error-result";
import {UserQueryData} from "../types";

const {Link, Text} = Typography;
type AsideProps = {
  showSearchBar: boolean;
}

function Aside(props: AsideProps) {
  const {loading, error, data} = useQuery<UserQueryData>(WHO_USER_QUERY);
  if (loading) return (<Spin spinning={loading} className="w-[350px] xl:w-[220px] md:hidden h-full mt-20"></Spin>);
  if (error) return (<div className="md:hidden"><ErrorResult message={error.message}/></div>);

  // TODO
  const userList = data!.UserQueries.searchUsers.map(user =>
    <div key={user.id}>
      {user.username}
    </div>
  );

  return (
    <aside className="w-[350px] xl:w-[220px] md:hidden h-full fixed ml-[598px] ht:right-2">
      {props.showSearchBar && <div className="text-white">TODO: searchbar</div>}
      <Card title="Who to follow" bordered={false} className="bg-info ml-8 my-4">
        {userList}
      </Card>
      <div className="flex flex-wrap justify-center w-60 h-10 ml-8 ht:ml-0 xl:ml-0">
        <Link className="pr-4 text-[13px]" href="https://github.com/kuro-vale/shiro-tweet" target="_blank">
          Repo</Link>
        <Link className="pr-4 text-[13px]" href="https://twitter.com/_Silvervale_" target="_blank">
          Best girl</Link>
        <Link className="pr-4" href={process.env.REACT_APP_API} target="_blank">
          API</Link>
        <Link className="pr-4 text-[13px]" href="https://twitter.com/kuro_vale" target="_blank">
          Twitter</Link>
        <Link className="pr-4 text-[13px]" href="https://www.linkedin.com/in/kurovale/" target="_blank">
          LinkedIn</Link>
        <Link className="pr-4 text-[13px]" href="mailto:jsalcedo218@gmail.com" target="_blank">
          Gmail</Link>
        <Text className="text-secondary text-[13px]">@2023 kurovale</Text>
      </div>
    </aside>
  );
}

export default Aside;