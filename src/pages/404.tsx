import {Button, Result, Typography} from "antd";
import {QuestionOutlined} from "@ant-design/icons";

const {Text} = Typography;

function NotFound() {
  return (
    <Result
      icon={<QuestionOutlined/>}
      subTitle="Hmm... this page doesn’t exist. Try searching for something else."
      extra={
        <Button type="primary" shape="round" size="large">
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default NotFound;