import { useState, useMemo, useCallback } from 'react';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);
  const logIn = useCallback((enjoyer) => {
    localStorage.setItem('user', JSON.stringify(enjoyer));
    setUser(enjoyer);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);
  const getAuthHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${user.token}` },
  }), [user]);

  const authValue = useMemo(() => ({
    user, getAuthHeaders, logOut, logIn,
  }), [user, getAuthHeaders, logOut, logIn]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
