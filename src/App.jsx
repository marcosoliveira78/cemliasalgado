import React from 'react';
import PageDefault from './component/PageDefault';
import MatriculaProvider from './context/matricula';
import LoginProvider from './context/Login';
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
