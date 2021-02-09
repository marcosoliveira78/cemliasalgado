import React, { createContext, useState, useContext } from 'react';

const MatriculaContext = createContext();

export default function MatriculaProvider({ children }) {
  const [matricula, setMatricula] = useState({});
  return (
    <MatriculaContext.Provider
      value={{
        matricula,
        setMatricula,
      }}>
      {children}
    </MatriculaContext.Provider>
  );
}

export function useMatricula() {
  const context = useContext(MatriculaContext);
  if (!context) throw new Error('useMatricula precisa ser usado dentro de um MatriculaProvider.');
  const { matricula, setMatricula } = context;
  return { matricula, setMatricula };
}
