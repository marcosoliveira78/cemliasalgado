import React from 'react';
import PageDefault from './component/PageDefault';
import LoginProvider from './context/Login';
import MatriculaProvider from './context/Matricula';
import Routes from './services/routes';

const App = () => (
  <MatriculaProvider>
    <LoginProvider>
      <PageDefault>
        <Routes />
      </PageDefault>
    </LoginProvider>
  </MatriculaProvider>
);

export default App;
