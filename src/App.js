import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"


function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-evenly items-center bg-black h-20 text-white">
        <a href="/" className="text-xl flex items-center gap-1">
        <i className="material-icons">book</i>
        <h1 className="uppercase">SupaBook</h1>
        </a>
        
        <Link to="/" className="material-icons hidden lg:block hover:text-red-500">home</Link>
        <Link to="/create" className="hover:bg-red-700 p-2 bg-red-500 rounded-lg">Create Summery</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
