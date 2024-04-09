import {User} from "../types/user.ts";
import getID from "./getID.ts";

const unique_id = getID()
const defaultUser: User = {username: 'noname', id: unique_id}

export function getNewUser(): User {
  return defaultUser
}