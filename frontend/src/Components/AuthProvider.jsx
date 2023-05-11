import { useState } from "react";
import { AuthContext } from "../context/AuthContext";


export const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser || null);
    const logIn = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)
    }
    const logOut = () => {
      localStorage.removeItem('user')
      setUser(null)
  }
  const getAuthHeaders = () => {
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }
  
    return (
      <AuthContext.Provider value={{ user, getAuthHeaders, logOut, logIn }}>
        {children}
      </AuthContext.Provider>
    );
  };