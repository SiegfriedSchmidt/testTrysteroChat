import {FC} from 'react';
import {MessageType} from "../types/chat.ts";

interface MessageProps {
  message: MessageType
  me: boolean
}

const userColor = 'rgb(171,232,232)'
const meColor = 'rgb(178,243,205)'

const Message: FC<MessageProps> = ({message, me}) => {
  return (
    <p style={{
      backgroundColor: me ? meColor : userColor,
      fontSize: '15pt',
      padding: 10,
      margin: 10,
      width: '35%',
      borderRadius: "10px"
    }}><span style={{color: 'white'}}>{message.username}</span> {message.text}</p>
  );
};

export default Message;