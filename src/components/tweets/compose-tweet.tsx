import {Avatar, Button, Form, FormInstance, message, Progress, Typography} from "antd";
import {useAuth} from "../../hooks";
import {FormEvent, useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {COMMENT_MUTATION, COMPOSE_MUTATION} from "../../graphql/mutations";
import {handleError, showMessage} from "../../utils";
import {ComposeData, Tweet} from "../../types";
import {TWEET_DETAILS} from "../../constants";

const {Text} = Typography;
type TweetForm = {
  body: string
}
type SubmitButtonProps = {
  form: FormInstance,
  onSubmit: () => void,
}
type ComposeTweetProps = {
  onComplete?: () => void,
  tweet?: Tweet,
  sm?: boolean,
}

const getRemaining = (percent: number): number => {
  return 255 - percent * 255 / 100;
};

const SubmitButton = ({form, onSubmit}: SubmitButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const [percent, setPercent] = useState(0);

  const values = Form.useWatch<TweetForm>([], form);

  useEffect(() => {
    form.validateFields({validateOnly: true}).then(
      () => {
        setDisabled(false);
      },
      () => {
        setDisabled(true);
      }
    );
    setPercent(values?.body?.trim() === "" ? 0 : values?.body?.length * 100 / 255);
  }, [form, values]);

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
      <Button
        shape="round"
        className={`bg-primary ${disabled ? "cursor-default" : "hover:bg-hover-primary"} w-20 h-9 transition-none mb-2`}
        disabled={disabled}
        onClick={onSubmit}
      >
        <Text strong>Tweet</Text>
      </Button>
    </div>
  );
};

function ComposeTweet({onComplete, tweet, sm}: ComposeTweetProps) {
  const {user} = useAuth();
  const [form] = Form.useForm<TweetForm>();
  const [compose, {loading}] = useMutation<ComposeData>(tweet ? COMMENT_MUTATION : COMPOSE_MUTATION);
  const [messageApi, contextHolder] = message.useMessage();
  const [progress, setProgress] = useState(10);

  const onSubmit = async () => {
    try {
      setTimeout(() => {
        setProgress(90);
      }, 10);
      const {data} = await compose({variables: {body: form.getFieldValue("body"), tweetId: tweet?.id}});
      const resultId = data?.TweetOps.compose?.id || data?.TweetOps.comment?.id;
      setProgress(10);
      form.resetFields();
      await showMessage(messageApi, "Your tweet was sent.",
        TWEET_DETAILS
          .replace(":tweetId", `${resultId}`)
          .replace(":username", user!.sub));
      onComplete?.();
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  const handleResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = sm ? "52px" : "120px";
    target.style.height = Math.min(target.scrollHeight, 240) + "px";
  };

  return (
    <>
      {contextHolder}
      {loading && <Progress percent={progress} showInfo={false} size="small"/>}
      <Form className={`flex flex-col ${loading ? "opacity-50" : ""}`} form={form} disabled={loading}>
        <div className="flex">
          <Avatar
            src={`https://picsum.photos/seed/${user?.sub}/400/`}
            size="large"
            alt={user?.id + " photo"}
            className="bg-gray"
          />
          <Form.Item<TweetForm>
            name="body"
            rules={[
              {required: true, message: ""},
              {max: 255, message: ""},
              {whitespace: true, message: ""}
            ]}
            className="w-full mt-1 pr-4 mb-0"
            hasFeedback={false}
          >
            <textarea
              placeholder={`${tweet ?
                user?.id === tweet.author.id ? "Add another tweet" : "Tweet your reply"
                : "What is happening?!"}`}
              className={`w-full ${sm ? "h-[52px]" : "h-[120px]"} placeholder:text-secondary outline-none text-xl ml-3 resize-none bg-transparency`}
              onInput={handleResize}
            />
          </Form.Item>
        </div>
        {!loading && <SubmitButton form={form} onSubmit={onSubmit}/>}
      </Form>
    </>
  );
}

export default ComposeTweet;