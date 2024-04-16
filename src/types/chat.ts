import {User} from "./user.ts";

export type MessageContentType = "text" | "video" | "image"

export type MessageBaseType = {
  sender: string
  senderId: string
  time: number
  hash: number
  type: MessageContentType
}

export type MessageTextType = MessageBaseType & {
  text: string,
  htmlParse: boolean
}

export type MessageFileType = MessageBaseType & {
  content: Blob
  metadata: MessageBaseType
}

export type MessageAllType = MessageFileType | MessageBaseType

export type Peers = { [peerId: string]: User };
