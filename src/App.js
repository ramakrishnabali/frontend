import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./components/Home"
import SpecificTask  from "./components/SpecificTask"

import "./App.css"

const App = ()=>(
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/task/:id" element={<SpecificTask />} />
  </Routes>
  </BrowserRouter>
)

export default App;