import {User} from "./user.ts";

export type MessageBaseType = {
  sender: string
  senderId: string
  time: number
  hash: number
}

export type MessageTextType = MessageBaseType & {
  text: string,
  htmlParse: boolean
}

export type MessageFileType = MessageBaseType & {
  content: Blob
  metadata: string
}

export type Peers = { [peerId: string]: User };
