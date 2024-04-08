import {createContext} from "react";
import {User} from "../types/user.ts";

interface UserSetter {
  user: User | null
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserSetter>({
  user: null,
  setUser: () => {},
})