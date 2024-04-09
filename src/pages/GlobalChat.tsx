import {useRoom} from "../hooks/useRoom.tsx";
import {useRef, useState, KeyboardEvent} from "react";
import {MessageType} from "../types/chat.ts";
import styled from "styled-components";
import send from "/send.svg"
import MessagesBox from "../components/MessagesBox.tsx";
import useUser from "../hooks/useUser.tsx";
import hashCode from "../utils/hash.ts";


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

type Peer = {
  username: string;
  sender_id: string;
}

const Main = () => {
  const {room} = useRoom(config, roomId)
  const {user} = useUser()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(1)
  const [allPeers, setAllPeers] = useState<Peer[]>([])

  const [sendMessage, getMessage] = room.makeAction('message')
  const [sendPeersMessages, getPeersMessages] = room.makeAction('peermessage')
  const [sendMessageRequest, getMessageRequest] = room.makeAction('messagereq')
  const [sendUsernameRequest, getUsernameRequest] = room.makeAction('activereq')
  const [sendUsername, getUsername] = room.makeAction('username')

  room.onPeerJoin((peerId: string) => {
    setPeerCount(peerCount + 1)
  })

  room.onPeerLeave((peerId: string) => {
    setPeerCount(peerCount - 1)
  })

  getMessage((message, peer) => {
    setMessages([...messages, message as MessageType])
  })

  getMessageRequest((data, peer) => {
    sendPeersMessages(messages)
  })

  getUsernameRequest((data, peer) => {
    sendUsername({username: user.username, sender_id: user.id})
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
        const new_messages: MessageType[] = [...(peers_messages as MessageType[]), ...messages]
        const new_unique_messages = getUniqueMessages(new_messages)
        new_unique_messages.sort((lhs, rhs) => {
          return lhs.time < rhs.time ? -1 : 1
        })
        return new_unique_messages
      })
    })

    setTimeout(() => {
      getPeersMessages((peers_messages, peer) => {
      })
    }, 5000)

    sendMessageRequest('')
  }

  function onClickGetUsernames() {
    setAllPeers([])
    setPeerCount(0)
    getUsername((data, peer) => {
      setAllPeers((peers) => {
        const uniquePeers = [...peers,].filter((value, index, array) => {
          return array.indexOf(value) === index;
        })
        setPeerCount(uniquePeers.length + 1)
        return uniquePeers
      })
    })

    setTimeout(() => {
      getUsername((username, peer) => {
      })
    }, 5000)

    sendUsernameRequest('')
  }

  function CreateMessage(sender: string, sender_id: string, text: string): MessageType {
    const newMessage = {sender, text, sender_id, time: (new Date()).getTime()}
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
      const message: MessageType = CreateMessage(user.username, user.id, textareaRef.current.value)
      setMessages([...messages, message])
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
          <button onClick={onClickGetUsernames} style={{padding: '5px'}}>Sync peers</button>
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