import {createContext} from "react";
import {User} from "../types/user.ts";
import {getNewUser} from "../utils/getNewUser.ts";

interface UserSetter {
  user: User
  setUser: (user: User) => void;
}


export const UserContext = createContext<UserSetter>({
  user: getNewUser(),
  setUser: () => {},
})