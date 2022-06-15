import { Routes, Route } from "react-router-dom";
import About from '../views/about'
import Home from '../views/home/index'
import ToolUnicodeConvert from '../views/tools/unicode-convert'
import ToolAutoFetch from '../views/tools/auto-fetch'


const routerList = <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/about" element={<About/>}></Route>
  <Route path="/tools/unicode-convert" element={<ToolUnicodeConvert/>}></Route>
  <Route path="/tools/auto-fetch" element={<ToolAutoFetch/>}></Route>

</Routes>

export default routerList