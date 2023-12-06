import {Card} from "antd";
import SearchUserList from "./search-user-list";


function WhoFollowList() {
  return (
    <Card title="Who to follow" bordered={false} className="bg-info my-4 w-[348px] lg:w-[288px]">
      <div className="w-full flex justify-center items-center">
        <SearchUserList/>
      </div>
    </Card>
  );
}

export default WhoFollowList;