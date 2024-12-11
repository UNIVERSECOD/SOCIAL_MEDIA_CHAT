import { BookmarkIcon, SearchIcon, UserPlus2, UsersIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { PATHS } from "./paths";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";

export const NAV_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    to: PATHS.HOME,
  },
  {
    title: "Profile",
    icon: PersonIcon,
    to: PATHS.PROFILE,
  },
  {
    title: "Saved Posts",
    icon: BookmarkIcon,
    to: PATHS.SAVED,
  },
  {
    title: "My Friends",
    icon: UsersIcon ,
    to: PATHS.FRIENDSHIP,
  },
  {
    title: "Requests",
    icon: UserPlus2,
    to: PATHS.FRIEND_REQUEST,
  },
  {
    title: "Find Friend",
    icon: SearchIcon,
    to: PATHS.FIND_FRIEND,
  },
  {
    title: "Messages",
    icon: ChatBubbleIcon,
    to: PATHS.CHAT,
  },
];
