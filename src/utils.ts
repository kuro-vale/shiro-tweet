import moment from "moment";

export function getDateMinimal(formattedDate: string): string {
  const time = moment.utc(formattedDate, "MMMM DD, YYYY at h:mm a");
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
  const time = moment.utc(formattedDate, "MMMM DD, YYYY at h:mm a");
  return time.local().format("h:mm A - MMM D, YYYY");
}