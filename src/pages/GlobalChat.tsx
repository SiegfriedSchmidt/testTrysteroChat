import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useRef, useState, KeyboardEvent} from "react";
import {ChatMessageType, MessageType} from "../types/chat.ts";
import styled from "styled-components";
import send from "../assets/send.svg"
import MessagesBox from "../components/MessagesBox.tsx";
import Message from "../components/Message.tsx";

const roomId = 'kfwlakflwekflmvlfkleflaepqe'
const config = {appId: 'my_best_app'}

const StyledDiv = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 1rem;
    background-color: whitesmoke;

    h1 {
        font-size: 15pt;
    }
`

const StyledTextarea = styled.textarea`
    font-size: 15pt;
    padding: 10px;
    margin: 10px;
`

const StyledButton = styled.div`
    img {
        width: 40px;
        height: 40px;
    }
`

const StyledDivSend = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: center;
    justify-content: space-evenly;
    align-items: center;
`

const Main = () => {
  const [room, selfId] = useRoom(config, roomId)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(1)

  const [sendMessage, getMessage] = room.makeAction('message')

  room.onPeerJoin((peerId: string) => {
    setPeerCount(peerCount + 1)
  })

  room.onPeerLeave((peerId: string) => {
    setPeerCount(peerCount - 1)
  })

  getMessage((message, peer) => {
    setMessages([...messages, {message: message as MessageType, me: false}])
  })

  function CreateMessage(sender: string, text: string): MessageType {
    return {sender, text, time: (new Date()).getTime()}
  }

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  function onClick() {
    if (textareaRef.current?.value) {
      const message: MessageType = CreateMessage("Unknown", textareaRef.current.value)
      setMessages([...messages, {message, me: true}])
      sendMessage(message)
      textareaRef.current.value = ''
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <StyledDiv>
      <h1>Online: {peerCount}</h1>
      <MessagesBox messages={messages}/>
      <StyledDivSend>
        <StyledTextarea onKeyDown={keyDownHandler} rows={2} cols={30} ref={textareaRef} style={{}}/>
        <StyledButton onClick={onClick}><img src={send} alt="send"/></StyledButton>
      </StyledDivSend>
    </StyledDiv>
    </div>

  );
};

export default Main;