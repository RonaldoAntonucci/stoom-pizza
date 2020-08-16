import React from 'react';

import { OrderProvider } from './OrderContext';
import { ToastProvider } from './ToastContext';

const AppProvider: React.FC = ({ children }) => (
  <OrderProvider>
    <ToastProvider>{children}</ToastProvider>
  </OrderProvider>
);

export default AppProvider;
