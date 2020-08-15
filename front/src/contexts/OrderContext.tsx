import React, { createContext, useState, useMemo } from 'react';

interface Order {
  ingredients: string[];
  dough: string;
  size: string;
}

export interface OrderContextData {
  ingredients: string[];
  dough: string;
  size: string;
  order: Order;

  setIngredients(ingredients: string[]): void;
  setDough(dough: string): void;
  setSize(size: string): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dough, setDough] = useState('');
  const [size, setSize] = useState('');

  const order = useMemo<Order>(() => ({ ingredients, dough, size }), [
    dough,
    ingredients,
    size,
  ]);

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
        order,
        setIngredients,
        setDough,
        setSize,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
