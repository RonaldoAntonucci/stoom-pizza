import React, { createContext, useState } from 'react';

export interface OrderContextData {
  ingredients: string[];
  setIngredients(ingredients: string[]): void;
  // Dough: string;
  // Size: string;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  return (
    <OrderContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
