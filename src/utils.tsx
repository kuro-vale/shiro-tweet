import moment from "moment";
import {MessageInstance} from "antd/lib/message/interface";
import {ApolloError} from "@apollo/client";
import {Link} from "react-router-dom";
import {DATE_FORMAT} from "./constants";

export function getDateMinimal(formattedDate: string): string {
  const time = moment.utc(formattedDate, DATE_FORMAT);
  let format = "MMM D";
  if (time.get("year") !== moment().get("year")) {
    format = "MMM D, YYYY";
  }
  const diffDays = moment().diff(time, "days");
  if (diffDays !== 0) return time.local().format(format);
  const diffMinutes = moment().diff(time, "minutes");
  if (diffMinutes >= 60) {
    return moment().diff(time, "hours") + "h";
  }
  return diffMinutes + "m";
}

export function getDateDetails(formattedDate: string): string {
  const time = moment.utc(formattedDate, DATE_FORMAT);
  return time.local().format("h:mm A · MMM D, YYYY");
}

export function getMonthAndYear(formattedDate: string): string {
  const time = moment.utc(formattedDate, DATE_FORMAT);
  return time.local().format("MMMM YYYY");
}

export async function handleError(messageApi: MessageInstance, e: any) {
  if (e instanceof ApolloError) {
    messageApi.error(e.message);
  } else {
    console.error(e);
  }
}

export async function showMessage(messageApi: MessageInstance, message: string, viewUrl?: string) {
  messageApi.open({
    type: "success",
    content: <div className="flex justify-evenly">
      <p>{message}</p>
      {viewUrl &&
        <Link className="font-bold hover:underline hover:text-white" to={viewUrl}>View</Link>}
    </div>,
    className: "message-primary text-white",
    icon: <></>,
  });
}

export function shortNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
}