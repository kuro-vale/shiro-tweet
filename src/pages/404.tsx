import {Button, Result, Typography} from "antd";
import {QuestionOutlined} from "@ant-design/icons";
import {EXPLORE_ROUTE} from "../constants";
import {useTitle} from "../hooks";

const {Text} = Typography;

function NotFound() {
  useTitle("Not Found");

  return (
    <Result
      icon={<QuestionOutlined/>}
      subTitle="Hmm... this page doesn’t exist. Try searching for something else."
      extra={
        <Button shape="round" size="large" className="bg-primary hover:bg-hover-primary" href={EXPLORE_ROUTE}>
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default NotFound;