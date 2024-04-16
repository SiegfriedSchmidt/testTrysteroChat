import {Protocol} from "./protocols.ts";

export type User = {username: string, id: string}
export type UserData = {firefly: boolean, htmlParse: boolean, protocol: Protocol}