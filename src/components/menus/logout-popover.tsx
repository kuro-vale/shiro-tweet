import {Popover, Typography} from "antd";
import {useAuth} from "../../hooks";
import {useState} from "react";
import {LogoutPopoverProps} from "../../types";
import LogoutModal from "../auth-modals/logout-modal";

const {Text} = Typography;

function LogoutPopover(props: LogoutPopoverProps) {
  const {user} = useAuth();
  const [openPopover, setOpenPopover] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const onOpenLogout = () => {
    setOpenPopover(false);
    setOpenLogout(true);
  };

  return (
    <>
      <LogoutModal open={openLogout} onClose={() => setOpenLogout(false)}/>
      <Popover
        content={
          <div className="flex flex-col">
            <Text strong className="py-3 px1 hover:bg-hover-pop cursor-not-allowed">Add an existing account</Text>
            <Text strong className="py-3 px1 hover:bg-hover-pop hover:cursor-pointer" onClick={onOpenLogout}>
              Log out @{user?.sub}
            </Text>
          </div>
        }
        open={openPopover}
        trigger="click"
        onOpenChange={setOpenPopover}
      >
        {props.children}
      </Popover>
    </>
  );
}

export default LogoutPopover;