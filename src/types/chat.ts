export type MessageType = { sender: string, text: string, time: number}
export type ChatMessageType = { message: MessageType, me: boolean }