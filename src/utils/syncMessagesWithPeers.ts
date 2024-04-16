import {MessageTextType, Peers} from "../types/chat.ts";
import {getMessagesHashes} from "./messagesUtils.ts";
import {DataPayload} from "trystero";

export default function syncMessagesWithPeers(
  peers: Peers,
  hashes: number[],
  sendMessagesRequest: (hashes: number[], peerId: string) => void,
  getPeersMessages: (receiver: (peersMessages: DataPayload) => void) => void,
  timeout = 5000
): Promise<MessageTextType[]> {
  return new Promise((resolve) => {
    const peersIds = Object.keys(peers)
    const messages: MessageTextType[] = [];
    let curIdx = 0
    const timeoutId = setTimeout(() => safeResolve(messages), timeout)

    function safeResolve(messages: MessageTextType[]) {
      clearTimeout(timeoutId)
      getPeersMessages(() => {
      })
      resolve(messages)
    }

    function receiver(peersMessages: DataPayload) {
      messages.push(...peersMessages as MessageTextType[])
      hashes.push(...getMessagesHashes(peersMessages as MessageTextType[]))
      if (curIdx >= peersIds.length) {
        safeResolve(messages)
        return
      }
      sendMessagesRequest(hashes, peersIds[curIdx])
      ++curIdx;
    }

    getPeersMessages(receiver)
    receiver([])
  })
}