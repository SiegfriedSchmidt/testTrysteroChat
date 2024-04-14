import {User} from "../types/user.ts";
import getID from "../utils/getID.ts";

const defaultUser: User = {username: 'noname', id: getID()}

export function getDefaultUser(): User {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : defaultUser;
}