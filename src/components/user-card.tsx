import {User} from "../types";
import {Avatar, Button, Typography} from "antd";

const {Text} = Typography;

type UserCardProps = {
  user: User
}

function UserCard(props: UserCardProps) {
  // TODO: Add follows states
  return (
   <div className="flex flex-row px-4 py-3 h-16 w-full justify-between hover:bg-hover-gray">
     <div className="flex">
       <Avatar src={`https://picsum.photos/seed/${props.user.username}/400/`} size="large" />
       <div className="flex flex-col ml-3">
         <Text strong className="h-[18px]">{props.user.username}</Text>
         <Text className="text-secondary h-[18px]">@{props.user.username}</Text>
       </div>
     </div>
     <Button shape="round" className="bg-white hover:bg-hover-white transition-none h-[34px] w-20 self-center">
       <Text strong className="text-black text-sm">Follow</Text>
     </Button>
   </div>
  )
}

export default UserCard;