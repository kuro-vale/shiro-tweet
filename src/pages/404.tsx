import {Button, Result, Typography} from "antd";
import {QuestionOutlined} from "@ant-design/icons";

const {Text} = Typography;

function NotFound() {
  return (
    <Result
      icon={<QuestionOutlined className="color-primary"/>}
      subTitle="Hmm... this page doesn’t exist. Try searching for something else."
      extra={
        <Button shape="round" size="large" className="bg-primary">
          {/*TODO*/}
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default NotFound;