import { useContext } from 'react';

import { ToastContext, ToastContextData } from '../contexts/ToastContext';

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
};

export default useToast;
