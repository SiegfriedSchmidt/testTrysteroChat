import {useState} from 'react'
import {
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import GlobalChat from "./pages/GlobalChat.tsx";
import About from "./pages/About.tsx";
import {UserContext} from "./context/UserContext.tsx";
import {User, UserData} from "./types/user.ts";
import {getDefaultUser} from "./defaultContext/getDefaultUser.ts";
import {UserDataContext} from "./context/UserDataContext.tsx";
import {getDefaultUserData} from "./defaultContext/getDefaultUserData.ts";

const router = createHashRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/global_chat" element={<GlobalChat/>}/>
    <Route path="/about" element={<About/>}/>
  </Route>
))

function App() {
  const [user, setUser] = useState<User>(getDefaultUser)
  const [userData, setUserData] = useState<UserData>(getDefaultUserData)

  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <UserContext.Provider value={{user, setUser}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </UserDataContext.Provider>
  )
}

export default App
