import {UserData} from "../types/user.ts";

const defaultUserData: UserData = {firefly: false, htmlParse: false, protocol: 'firebase'}

export function getDefaultUserData(): UserData {
  const storedUserData = localStorage.getItem("userData");
  return storedUserData ? JSON.parse(storedUserData) : defaultUserData;
}