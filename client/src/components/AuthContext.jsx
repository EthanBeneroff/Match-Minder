import React, { createContext, useState } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
  
    const login = () => {
      // Perform login logic here (e.g., make an API call to the backend)
      // Once the login is successful, set isAuthenticated to true
      setAuthenticated(true);
    };
  
    const logout = () => {
      // Perform logout logic here (e.g., make an API call to the backend)
      // Once the logout is successful, set isAuthenticated to false
      setAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;