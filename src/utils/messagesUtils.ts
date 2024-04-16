import {MessageType} from "../types/chat.ts";
import hashCode from "./hash.ts";

export function createMessage(sender: string, sender_id: string, text: string, html_parse: boolean): MessageType {
  const newMessage = {sender, text, sender_id, html_parse, time: (new Date()).getTime()}
  return {...newMessage, hash: hashCode(JSON.stringify(newMessage))}
}

export function getUniqueMessages(messages: MessageType[]): MessageType[] {
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

export function sortMessages(messages: MessageType[]) {
  messages.sort((lhs, rhs) => {
    return lhs.time < rhs.time ? -1 : 1
  })
  return messages
}

export function getMessagesHashes(messages: MessageType[]): number[] {
  return messages.map(({hash}) => hash)
}

export function getMissingMessages(hashes: number[], messages: MessageType[]) {
  return messages.filter(message => !hashes.includes(message.hash))
}