import {useState} from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import GlobalChat from "./pages/GlobalChat.tsx";
import About from "./pages/About.tsx";
import {UserContext} from "./context/UserContext.tsx";
import {User} from "./types/user.ts";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/global_chat" element={<GlobalChat/>}/>
    <Route path="/about" element={<About/>}/>
  </Route>
), {basename: import.meta.env.BASE_URL})

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  )
}

export default App
