import {Key, MouseEventHandler, ReactNode} from "react";
import {MenuItem} from "./types";

export function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  disabled?: boolean,
  onClick?: MouseEventHandler,
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    label,
    onClick,
    disabled,
    type,
  } as MenuItem;
}