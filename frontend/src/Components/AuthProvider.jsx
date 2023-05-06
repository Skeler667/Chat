import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const AuthProvider = ({ children }) => {
    const currentToken = localStorage.getItem('user');
    const [token, setToken] = useState(currentToken || null);
    const [username, setUsername] = useState( null )
    const navigate = useNavigate()
    const logIn = (token) => {
      localStorage.setItem('user', token)
      navigate('/')
    }
    const logOut = () => {
      localStorage.removeItem('user')
      navigate('/login')
  }
  
    return (
      <AuthContext.Provider value={{ username, setUsername, token, setToken, logOut, logIn }}>
        {children}
      </AuthContext.Provider>
    );
  };