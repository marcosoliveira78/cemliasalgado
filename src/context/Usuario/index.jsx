import React, { createContext, useState, useContext } from 'react';

const UsuarioContext = createContext();

export default function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
      }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error('useUsuario precisa ser usado dentro de um UsuarioProvider');
  const { usuario, setUsuario } = context;
  return { usuario, setUsuario };
}
