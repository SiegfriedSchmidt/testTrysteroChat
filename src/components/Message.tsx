import {FC} from 'react';

interface MessageProps {
  user: string
  text: string
  me: boolean
}

const userColor = 'rgb(171,232,232)'
const meColor = 'rgb(178,243,205)'

const Message: FC<MessageProps> = ({user, text, me}) => {
  return (
    <p style={{
      backgroundColor: me ? meColor : userColor,
      fontSize: '15pt',
      padding: 10,
      margin: 10,
      width: '35%',
      borderRadius: "10px"
    }}><span style={{color: 'white'}}>{user}</span> {text}</p>
  );
};

export default Message;