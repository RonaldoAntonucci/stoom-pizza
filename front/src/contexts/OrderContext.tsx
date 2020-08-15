import React, { createContext, useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
}

interface Dough {
  id: string;
  name: string;
}

interface Size {
  id: string;
  name: string;
  description: string;
}

export interface OrderContextData {
  ingredients: Ingredient[];
  dough: Dough;
  size: Size;

  setIngredients(ingredients: Ingredient[]): void;
  setDough(dough: Dough): void;
  setSize(size: Size): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dough, setDough] = useState<Dough>({} as Dough);
  const [size, setSize] = useState<Size>({} as Size);

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
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
