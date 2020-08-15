import { useContext } from 'react';

import { OrderContext, OrderContextData } from '../contexts/OrderContext';

const useOrder = (): OrderContextData => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }

  return context;
};

export default useOrder;
