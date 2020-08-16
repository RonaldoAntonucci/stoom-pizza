import React, { createContext, useState, useCallback, useMemo } from 'react';

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

  isComplete: boolean;

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
    setDough({} as Dough);
    setSize({} as Size);
    setDailyRecommendation(false);
    setPoints(0);
  }, []);

  const isComplete: boolean = useMemo(() => {
    if (
      dough &&
      dough.id &&
      ingredients &&
      ingredients.length > 0 &&
      size &&
      size.id
    ) {
      return true;
    }

    return false;
  }, [dough, ingredients, size]);

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
        dailyRecommendation,
        points,
        isComplete,
        setIngredients,
        setDough,
        setSize,
        setDailyRecommendation,
        setPoints,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
