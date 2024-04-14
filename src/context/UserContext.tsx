import {createContext} from "react";
import {User} from "../types/user.ts";
import {getDefaultUser} from "../defaultContext/getDefaultUser.ts";

interface UserSetter {
  user: User
  setUser: (user: User) => void;
}


export const UserContext = createContext<UserSetter>({
  user: getDefaultUser(),
  setUser: () => {},
})