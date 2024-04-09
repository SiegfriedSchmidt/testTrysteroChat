import {joinRoom} from "trystero/torrent";
import {useEffect, useRef} from 'react'
import {BaseRoomConfig, Room, selfId} from "trystero";

export const useRoom = (roomConfig: BaseRoomConfig, roomId: string): {room: Room, selfId: string} => {
  const roomRef = useRef(joinRoom(roomConfig, roomId))

  useEffect(() => {
    console.log('connected')
    roomRef.current = joinRoom(roomConfig, roomId)
    return () => roomRef.current.leave()
  }, [roomConfig, roomId])

  return {room: roomRef.current, selfId: selfId}
}