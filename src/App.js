import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"


function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-evenly items-center bg-black h-20 text-white">
        <div className="text-xl flex items-center gap-1">
        <i className="material-icons">book</i>
        <h1 className="uppercase">Book Club</h1>
        </div>
        
        <Link to="/" className="material-icons hover:text-red-500">home</Link>
        <Link to="/create" className="hover:text-red-500">Create Summery</Link>
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
