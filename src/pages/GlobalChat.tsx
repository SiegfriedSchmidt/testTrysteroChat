import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useRef, useState, KeyboardEvent} from "react";
import Message from "../components/Message.tsx";
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";
import send from "../assets/send.svg"

const roomId = '43513413616461346431'
const config = {appId: 'my_best_app'}


const StyledDiv = styled.div`
    padding: 1rem;

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

const StyledDivMessages = styled.div`
    margin-top: 1rem;
    border: black solid 1px;
    border-radius: 7px;
    height: 74vh;
    overflow-x: hidden;
`

const Main = () => {
  const [room, selfId] = useRoom(config, roomId)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<{ message: MessageType, me: boolean }[]>([])
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

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  function onClick() {
    if (textareaRef.current?.value) {
      const message: MessageType = {username: 'Unknown', text: textareaRef.current.value}
      setMessages([...messages, {message, me: true}])
      sendMessage(message)
      textareaRef.current.value = ''
    }
  }

  return (
    <StyledDiv>
      <h1>Online: {peerCount}</h1>
      <StyledDivMessages>
        {messages.map((message, idx) =>
          <Message key={idx} message={message.message} me={message.me}/>
        )}
      </StyledDivMessages>
      <StyledDivSend>
        <StyledTextarea rows={2} cols={30} ref={textareaRef} style={{}}/>
        <StyledButton onClick={onClick}><img src={send} alt="send"/></StyledButton>
      </StyledDivSend>
    </StyledDiv>
  );
};

export default Main;