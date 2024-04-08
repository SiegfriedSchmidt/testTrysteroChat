export type MessageType = { sender: string, text: string, time: number, hash: number}
export type ChatMessageType = { message: MessageType, me: boolean }