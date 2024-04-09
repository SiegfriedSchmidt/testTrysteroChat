import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {User} from "../types/user.ts";

const useUser = () => {
  const {user, setUser} = useContext(UserContext)

  function addUser(username: string) {
    const new_user: User = {username: username, id: user.id}
    setUser(new_user)
    localStorage.setItem("user", JSON.stringify(new_user))
  }

  return {user, addUser}
}

export default useUser