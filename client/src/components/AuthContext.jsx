import React, { createContext, useState } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
  
    const login = (values) => {
        console.log(values);
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.ok) {
              setAuthenticated(true);
              return {"message" : "logged in successfully"};
            }
            // Handle login error
            throw new Error('Login failed');
          })
          .catch((error) => {
            // Handle general error
            console.error('Login error:', error);
          });
      };
  
      const logout = () => {
        fetch('/api/logout', {
          method: 'POST',
        })
          .then((response) => {
            if (response.ok) {
              setAuthenticated(false);
            }
            // Handle logout error
            throw new Error('Logout failed');
          })
          .catch((error) => {
            // Handle general error
            console.error('Logout error:', error);
          });
      };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;