import React from 'react';

import { OrderProvider } from './OrderContext';

const AppProvider: React.FC = ({ children }) => (
  <OrderProvider>{children}</OrderProvider>
);

export default AppProvider;
