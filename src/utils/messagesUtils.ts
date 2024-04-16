import {MessageTextType} from "../types/chat.ts";
import hashCode from "./hash.ts";

export function createMessage(sender: string, senderId: string, text: string, htmlParse: boolean): MessageTextType {
  const newMessage = {sender, text, senderId, htmlParse, time: (new Date()).getTime()}
  return {...newMessage, hash: hashCode(JSON.stringify(newMessage))}
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

export function sortMessages(messages: MessageTextType[]) {
  messages.sort((lhs, rhs) => {
    return lhs.time < rhs.time ? -1 : 1
  })
  return messages
}

export function getMessagesHashes(messages: MessageTextType[]): number[] {
  return messages.map(({hash}) => hash)
}

export function getMissingMessages(hashes: number[], messages: MessageTextType[]) {
  return messages.filter(message => !hashes.includes(message.hash))
}