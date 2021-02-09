import React from 'react';
import PageDefault from './component/PageDefault';
import MatriculaProvider from './Context/Matricula';
import LoginProvider from './Context/Login';
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
