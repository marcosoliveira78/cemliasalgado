import React from 'react';
import PageDefault from './component/PageDefault';
import LoginProvider from './context/Login';
import MatriculaProvider from './context/Matricula/index';
import Routes from './services/routes';

const App = () => (
      <LoginProvider>
  <MatriculaProvider>
    <PageDefault>
      <Routes />
    </PageDefault>
  </MatriculaProvider>
      </LoginProvider>
);

export default App;
