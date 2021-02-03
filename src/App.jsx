import React from 'react';
import PageDefault from './component/PageDefault';
import MatriculaProvider from './context/matricula';
import Routes from './services/routes';

function App() {
  return (
    <MatriculaProvider>
    <PageDefault>
      <Routes />
    </PageDefault>
    </MatriculaProvider>
  );
}

export default App;
