import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./components/Login";
import Bottom from "./components/Bottom";

import Home from "./pages/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Logout from "./pages/Logout";
import Forgotpassword from "./components/Forgotpassword";
import Passwordreset from "./components/Passwordreset";

const App = () => {
  return (
    <div className="font-body">
      <UserContextProvider>
        <div>
          <Navbar />
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route
              path="/passwordreset/:resetToken"
              element={<Passwordreset />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/identifyemail/:token" element={<Home />} />
          </Routes>
        </div>
        <div>
          <Bottom />
        </div>
      </UserContextProvider>
    </div>
  );
};

export default App;
