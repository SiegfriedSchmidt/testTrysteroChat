import {User} from "./user.ts";

export type MessageType = {
  sender: string,
  sender_id: string,
  text: string,
  time: number,
  hash: number,
  html_parse: boolean
}

export type Peers = { [peerId: string]: User };
