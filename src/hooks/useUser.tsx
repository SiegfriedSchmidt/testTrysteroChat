import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {User} from "../types/user.ts";

const useUser = () => {
  const {user, setUser} = useContext(UserContext)

  function addUser(user: User) {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  function removeUser() {
    setUser(null)
    localStorage.removeItem("user")
  }

  const username = user ? user.username : 'Unknown'
  return {username, addUser, removeUser}
}

export default useUser