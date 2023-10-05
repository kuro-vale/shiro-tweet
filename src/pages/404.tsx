import {Button, Result, Typography} from "antd";
import {QuestionOutlined} from "@ant-design/icons";
import {EXPLORE_ROUTE} from "../constants";

const {Text} = Typography;

function NotFound() {
  return (
    <Result
      icon={<QuestionOutlined className="color-primary"/>}
      subTitle="Hmm... this page doesn’t exist. Try searching for something else."
      extra={
        <Button shape="round" size="large" className="bg-primary btn-primary-hover" href={EXPLORE_ROUTE}>
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default NotFound;