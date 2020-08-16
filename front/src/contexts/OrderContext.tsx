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
  imageUrl: string;

  dailyRecommendation: boolean;
  points: number;

  isComplete: boolean;
  isDoughComplete: boolean;
  isIngredientsComplete: boolean;

  setIngredients(ingredients: Ingredient[]): void;
  setDough(dough: Dough): void;
  setSize(size: Size): void;
  setImageUrl(image: string): void;
  setDailyRecommendation(value: boolean): void;
  setPoints(points: number): void;
  clearOrder(): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dough, setDough] = useState<Dough>({} as Dough);
  const [size, setSize] = useState<Size>({} as Size);
  const [imageUrl, setImageUrl] = useState('');
  const [dailyRecommendation, setDailyRecommendation] = useState(false);
  const [points, setPoints] = useState<number>(0);

  const clearOrder = useCallback(() => {
    setIngredients([]);
    setDough({} as Dough);
    setSize({} as Size);
    setImageUrl('');
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

  const isDoughComplete = useMemo(() => {
    if (dough && dough.id) {
      return true;
    }

    return false;
  }, [dough]);

  const isIngredientsComplete = useMemo(() => {
    if (dough && dough.id && ingredients && ingredients.length > 0) {
      return true;
    }

    return false;
  }, [dough, ingredients]);

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
        imageUrl,
        dailyRecommendation,
        points,
        isComplete,
        isDoughComplete,
        isIngredientsComplete,
        setIngredients,
        setDough,
        setSize,
        setImageUrl,
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
