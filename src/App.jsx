import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import ViewDog from "./Pages/ViewDog"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<ViewDog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App