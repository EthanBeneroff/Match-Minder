import React, { createContext, useState } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
  
    const login = async (email, password) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            setAuthenticated(true);
            return {"message" : "logged in successfully"}
        } 
        } catch (error) {
          // write login error
        }
      };
  
      const logout = async () => {
        try {
          const response = await fetch('/api/logout', {
            method: 'POST',
          });
    
          if (response.ok) {setAuthenticated(false);} 
        } catch (error) {
          // write logout error
        }
      };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;