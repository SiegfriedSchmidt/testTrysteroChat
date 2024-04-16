import {User} from "./user.ts";

export type MessageBaseType = {
  sender: string
  sender_id: string
  time: number
  hash: number
}

export type MessageTextType = MessageBaseType & {
  text: string,
  html_parse: boolean
}

export type MessageFileType = MessageBaseType & {
  content: Blob
  metadata: string
}

export type Peers = { [peerId: string]: User };
