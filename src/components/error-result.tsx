import {WarningOutlined} from "@ant-design/icons";
import {Button, Result, Typography} from "antd";
import {EXPLORE_ROUTE, LANDING_ROUTE} from "../constants";
import {ApolloError} from "@apollo/client";

const {Text} = Typography;
type ErrorResultProps = {
  error: ApolloError | undefined,
  message?: string,
}

function ErrorResult({error, message}: ErrorResultProps) {
  if (error?.message.includes("Unauthenticated")) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = LANDING_ROUTE;
  }
  return (
    <Result
      icon={<WarningOutlined/>}
      subTitle={error?.message || message}
      extra={
        <Button shape="round" size="large" className="bg-primary hover:bg-hover-primary" href={EXPLORE_ROUTE}>
          <Text strong>Search</Text>
        </Button>
      }
    />
  );
}

export default ErrorResult;