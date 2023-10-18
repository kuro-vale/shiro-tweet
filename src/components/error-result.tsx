import {ErrorResultProps} from "../types";
import {WarningOutlined} from "@ant-design/icons";
import {Button, Result, Typography} from "antd";
import {EXPLORE_ROUTE} from "../constants";

const {Text} = Typography;

function ErrorResult(props: ErrorResultProps) {
  return (
    <Result
      icon={<WarningOutlined/>}
      subTitle={props.message}
      extra={
        <Button shape="round" size="large" className="bg-primary hover:bg-hover-primary" href={EXPLORE_ROUTE}>
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default ErrorResult;