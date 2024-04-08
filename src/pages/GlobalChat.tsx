import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useRef, useState, KeyboardEvent} from "react";
import {ChatMessageType, MessageType} from "../types/chat.ts";
import styled from "styled-components";
import send from "../assets/send.svg"
import MessagesBox from "../components/MessagesBox.tsx";
import Message from "../components/Message.tsx";
import useUser from "../hooks/useUser.tsx";
import hashCode from "../utils/hash.ts";
import message from "../components/Message.tsx";
import {log} from "node:util";

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

const StyledDivSyncMessages = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const Main = () => {
  const [room, selfId] = useRoom(config, roomId)
  const {username} = useUser()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(1)

  const [sendMessage, getMessage] = room.makeAction('message')
  const [sendPeersMessages, getPeersMessages] = room.makeAction('peermessage')
  const [sendMessageRequest, getMessageRequest] = room.makeAction('messagereq')

  room.onPeerJoin((peerId: string) => {
    setPeerCount(peerCount + 1)
  })

  room.onPeerLeave((peerId: string) => {
    setPeerCount(peerCount - 1)
  })

  getMessage((message, peer) => {
    setMessages([...messages, {message: message as MessageType, me: false}])
  })

  getMessageRequest((data, peer) => {
    const messages_without_me: MessageType[] = messages.map((v) => v.message)
    sendPeersMessages(messages_without_me)
  })

  function getUniqueMessages(messages: MessageType[]): MessageType[] {
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

  function onClickSyncMessages() {
    getPeersMessages((peers_messages, peer) => {
      setMessages((messages) => {
        const messages_without_me: MessageType[] = messages.map((v) => v.message)
        const new_messages: MessageType[] = [...(peers_messages as MessageType[]), ...messages_without_me]
        const new_unique_messages = getUniqueMessages(new_messages)
        const completed_messages: ChatMessageType[] = new_unique_messages.map((v) => {
          return {message: v, me: v.sender === username}
        })
        return completed_messages
      })
    })

    setTimeout(() => {
      getPeersMessages((peers_messages, peer) => {
      })
    }, 5000)

    sendMessageRequest('')
  }

  function CreateMessage(sender: string, text: string): MessageType {
    const newMessage = {sender, text, time: (new Date()).getTime()}
    return {...newMessage, hash: hashCode(JSON.stringify(newMessage))}
  }

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
  }

  function onClick() {
    if (textareaRef.current?.value) {
      const message: MessageType = CreateMessage(username, textareaRef.current.value)
      setMessages([...messages, {message, me: true}])
      sendMessage(message)
      textareaRef.current.value = ''
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <StyledDiv>
        <StyledDivSyncMessages>
          <h1>Online: {peerCount}</h1>
          <button onClick={onClickSyncMessages} style={{padding: '5px'}}>Sync messages</button>
        </StyledDivSyncMessages>
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