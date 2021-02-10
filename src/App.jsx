import React from 'react';
import PageDefault from './component/PageDefault';
import MatriculaProvider from './context/matricula';
import LoginProvider from './context/Login';
import Routes from './services/routes';
import UsuarioProvider from './context/Usuario';

const App = () => (
  <UsuarioProvider>
  <MatriculaProvider>
    <LoginProvider>
      <PageDefault>
        <Routes />
      </PageDefault>
    </LoginProvider>
  </MatriculaProvider>
  </UsuarioProvider>
);

export default App;
