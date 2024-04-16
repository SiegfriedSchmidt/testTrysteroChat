import {Room} from "trystero";
import {useMemo} from "react";

const useRoomAction = (name: string, room: Room) => {
  return useMemo(() => room.makeAction(name), [room, name])
}

export default useRoomAction