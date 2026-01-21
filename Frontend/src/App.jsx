import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useAuth } from "../context/AuthProvider";


function App() {
  const [authUser, setAuthUser] = useAuth();
  if(authUser){
    console.log("authUser : ", authUser.user);
  }
  return (
    <>
      <Routes>
        <Route path="/login" element={authUser ? (<Navigate to="/" />) : <Login />} />
        <Route path="/signup" element={authUser ? (<Navigate to="/" />) : <Signup /> } />
        <Route path="/" element={authUser ? <Home /> : (<Navigate to="/login" />) } />
      </Routes>
    </>
  );
}

export default App;

