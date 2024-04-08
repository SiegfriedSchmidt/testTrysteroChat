import {useRoom} from "../hooks/useRoom.tsx";
import {useEffect, useRef, useState} from "react";
import Message from "../components/Message.tsx";


const roomId = '43513413616461346431'
const config = {appId: 'my_best_app'}

type messageType = { text: string, peer: string, me: boolean }
const Main = () => {
  const [room, selfId] = useRoom(config, roomId)
  const [sendMessage, getMessage] = room.makeAction('message')
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<messageType[]>([])
  const [peerCount, setPeerCount] = useState<number>(1)

  room.onPeerJoin((peerId: string) => {
    console.log(`join ${peerId}`)
    setPeerCount(peerCount + 1)
  })

  room.onPeerLeave((peerId: string) => {
    console.log(`leave ${peerId}`)
    setPeerCount(peerCount - 1)
  })

  getMessage((message, peer) => {
    setMessages([...messages, {text: message as string, me: false, peer}])
  })

  function onClick() {
    if (inputRef.current?.value) {
      setMessages([...messages, {text: inputRef.current.value, me: true, peer: selfId}])
      sendMessage(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  return (
    <div style={{padding: 10}}>
      <h1 style={{fontSize: '15pt'}}>Pear count: {peerCount}</h1>
      <h1 style={{fontSize: '15pt'}}>Room id: {roomId}</h1>
      <h1 style={{fontSize: '15pt'}}>Username: {selfId}</h1>
      <div>
        <input ref={inputRef} style={{fontSize: '15pt', padding: 10, margin: 10}}
               type="text"/>
        <button onClick={onClick} style={{fontSize: '15pt'}}>Send</button>
      </div>
      <div>
        {messages.map((message) =>
          <Message user={message.peer} text={message.text} me={message.me}/>
        )}
      </div>
    </div>
  );
};

export default Main;