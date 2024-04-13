import {MessageType} from "../types/chat.ts";

export default function getUniqueMessages(messages: MessageType[]): MessageType[] {
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