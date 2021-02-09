import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [admin, setAdmin] = useState(localStorage.getItem('USER_LOGGED') !== null && JSON.parse(localStorage.getItem('USER_LOGGED')).isAdmin);
  const [login, setLogin] = useState(localStorage.getItem('USER_LOGGED') !== null);
  return (
        <LoginContext.Provider
            value={{
              login,
              setLogin,
              admin,
              setAdmin,
            }}>
            {children}
        </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) throw new Error('useLogin precisa ser usado dentro de um loginProvider');
  const { login, setLogin, admin, setAdmin } = context;
  return { login, setLogin, admin, setAdmin };
}
