import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Replies } from "./components/Replies"

export const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/:id/replies' element={<Replies />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
