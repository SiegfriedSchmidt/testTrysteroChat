import {createContext} from "react";
import {UserData} from "../types/user.ts";

interface UserDataSetter {
  userData: UserData
  setUserData: (userData: UserData) => void;
}


export const UserDataContext = createContext<UserDataSetter>({
  userData: {firefly: false, html_parse: false, protocol: 'torrent'},
  setUserData: () => {
  },
})