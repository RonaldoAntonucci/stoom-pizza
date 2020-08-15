import React, { createContext, useState } from 'react';

export interface OrderContextData {
  ingredients: string[];
  dough: string;

  setIngredients(ingredients: string[]): void;
  setDough(dough: string): void;
  // Size: string;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dough, setDough] = useState('');

  return (
    <OrderContext.Provider
      value={{ ingredients, dough, setIngredients, setDough }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
