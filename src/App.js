import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";

import SideAndNavbar from "./components/SideAndNavbar";
import Welcome from "./components/Welcome";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideAndNavbar />}>
            <Route index element={<Welcome />} />
            <Route path="/user-details" element={<Home />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
