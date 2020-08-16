import React, { createContext, useState, useCallback } from 'react';

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

  dailyRecommendation: boolean;
  points: number;

  setIngredients(ingredients: Ingredient[]): void;
  setDough(dough: Dough): void;
  setSize(size: Size): void;
  setDailyRecommendation(value: boolean): void;
  setPoints(points: number): void;
  clearOrder(): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dough, setDough] = useState<Dough>({} as Dough);
  const [size, setSize] = useState<Size>({} as Size);
  const [dailyRecommendation, setDailyRecommendation] = useState(false);
  const [points, setPoints] = useState<number>(0);

  const clearOrder = useCallback(() => {
    setIngredients([]);
    setDough({} as Dough)
    setSize({} as Size)
    setDailyRecommendation(false)
    setPoints(0)
  }, [])

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
        dailyRecommendation,
        points,
        setIngredients,
        setDough,
        setSize,
        setDailyRecommendation,
        setPoints,
        clearOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
