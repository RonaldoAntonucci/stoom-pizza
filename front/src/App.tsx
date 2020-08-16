import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './contexts';

import Routes from './routes';
import Steps from './components/Steps';

const App: React.FC = () => (
  <BrowserRouter>
    <div
      style={{
        maxWidth: 1280,
        width: '100vh',
      }}
    >
      <AppProvider>
        <Steps />
        <Routes />
      </AppProvider>
    </div>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
