import {Avatar, Button, Form, FormInstance, Input, Progress, Typography} from "antd";
import {useAuth} from "../../hooks";
import {useEffect, useState} from "react";

const {TextArea} = Input;
const {Text} = Typography;
type TweetForm = {
  body: string
}
type SubmitButtonProps = {
  form: FormInstance
}

const getRemaining = (percent: number): number => {
  return 255 - percent * 255 / 100;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const [percent, setPercent] = useState(0);

  const values = Form.useWatch<TweetForm>([], props.form);

  useEffect(() => {
    props.form.validateFields({validateOnly: true}).then(
      () => {
        setDisabled(false);
      },
      () => {
        setDisabled(true);
      }
    );
    setPercent(values?.body?.trim() === "" ? 0 : values?.body?.length * 100 / 255);
  }, [props.form, values]);

  return (
    <div className="flex justify-end items-end h-12">
      {percent > 0 &&
        <Progress
          type="circle"
          percent={percent}
          format={() => `${getRemaining(percent) <= 20 ? getRemaining(percent) : ""}`}
          size={getRemaining(percent) <= 20 ? 35 : 30}
          status={getRemaining(percent) <= 0 ? "exception" : "normal"}
          strokeColor={`${getRemaining(percent) > 0 && getRemaining(percent) <= 20 ? "yellow" : ""}`}
          strokeWidth={7}
          className={`${getRemaining(percent) <= 20 ? "mb-[2px] mr-3" : "mb-1 mr-4"}`}
        />}
      {/*TODO: make this work*/}
      <Button
        shape="round"
        className={`bg-primary ${disabled ? "cursor-default" : "hover:bg-hover-primary"} w-20 h-9 transition-none`}
        disabled={disabled}
      >
        <Text strong>Tweet</Text>
      </Button>
    </div>
  );
};

function ComposeTweet() {
  const {user} = useAuth();
  const [form] = Form.useForm<TweetForm>();

  return (
    <Form className="flex flex-col px-4 xs:hidden" form={form}>
      <div className="flex">
        <Avatar src={`https://picsum.photos/seed/${user?.sub}/400/`} size="large" alt={user?.id + " photo"}/>
        <Form.Item<TweetForm>
          name="body"
          rules={[
            {required: true, message: ""},
            {max: 255, message: ""},
            {whitespace: true, message: ""}
          ]}
          className="w-full"
        >
          <TextArea
            autoSize={{minRows: 2, maxRows: 18}}
            placeholder="What is happening?!"
            className="max-w-[510px] text-xl ml-3 border-0 shadow-none"
          />
        </Form.Item>
      </div>
      <SubmitButton form={form}/>
    </Form>
  );
}

export default ComposeTweet;