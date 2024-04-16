import {MessageAllType, MessageBaseType, MessageContentType, MessageFileType, MessageTextType} from "../types/chat.ts";
import hashCode from "./hash.ts";

export function createTextMessage(sender: string, senderId: string, text: string, htmlParse: boolean): MessageTextType {
  const newMessage = {sender, text, senderId, htmlParse, time: (new Date()).getTime()}
  return {...newMessage, type: "text", hash: hashCode(JSON.stringify(newMessage))}
}

export function createFileMessage(sender: string, senderId: string, file: Blob, filetype: MessageContentType): MessageFileType {
  const metadata_raw = {sender, senderId, time: (new Date()).getTime()}
  const metadata: MessageBaseType = {...metadata_raw, type: filetype, hash: hashCode(JSON.stringify(metadata_raw))}
  return {...metadata, content: file, metadata}
}

export function getUniqueMessages(messages: MessageTextType[]): MessageTextType[] {
  const uniqueHashes: number[] = [];
  return messages.filter(element => {
    const isDuplicate = uniqueHashes.includes(element.hash);
    if (!isDuplicate) {
      uniqueHashes.push(element.hash);
      return true;
    }
    return false;
  })
}

export function sortMessages(messages: MessageAllType[]) {
  messages.sort((lhs, rhs) => {
    return lhs.time < rhs.time ? -1 : 1
  })
  return messages
}

export function getMessagesHashes(messages: MessageAllType[]): number[] {
  return messages.map(({hash}) => hash)
}

export function getMissingMessages(hashes: number[], messages: MessageTextType[]) {
  return messages.filter(message => !hashes.includes(message.hash))
}

export function getTextMessages(messages: MessageAllType[]): MessageTextType[] {
  return messages.filter((message) => {
    if ("text" in message) {
      return true
    }
  }) as MessageTextType[]
}