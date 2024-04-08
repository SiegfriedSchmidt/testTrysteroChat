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

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/global_chat" element={<GlobalChat/>}/>
  </Route>
))

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
