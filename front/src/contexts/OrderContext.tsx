import React, {
  useEffect,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface Ingredient {
  id: string;
  name: string;
  price: number;
}

interface Dough {
  id: string;
  name: string;
  price: number;
}

interface Size {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface OrderContextData {
  ingredients: Ingredient[];
  dough: Dough;
  size: Size;
  imageUrl: string;
  totalPrice: number;

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
  const key = '@StoomPizza';

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dough, setDough] = useState<Dough>({} as Dough);
  const [size, setSize] = useState<Size>({} as Size);
  const [imageUrl, setImageUrl] = useState('');
  const [dailyRecommendation, setDailyRecommendation] = useState(false);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const persistedDough = localStorage.getItem(`${key}:dough`);

    persistedDough && setDough(JSON.parse(persistedDough));

    const persistedIngredients = localStorage.getItem(`${key}:ingredients`);

    persistedIngredients && setIngredients(JSON.parse(persistedIngredients));

    const persistedSize = localStorage.getItem(`${key}:size`);

    persistedSize && setSize(JSON.parse(persistedSize));

    const persistedImageUrl = localStorage.getItem(`${key}:image`);

    persistedImageUrl && setImageUrl(JSON.parse(persistedImageUrl));

    const persistedDailyRecommendation = localStorage.getItem(
      `${key}:recommendation`,
    );

    persistedDailyRecommendation &&
      setDailyRecommendation(JSON.parse(persistedDailyRecommendation));

    const persistedPoints = localStorage.getItem(`${key}:points`);

    persistedPoints && setPoints(JSON.parse(persistedPoints));
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

  const totalPrice: number = useMemo((): number => {
    let price = 0;

    if (dough && dough.price) {
      price += dough.price;
    }

    if (size && size.price) {
      price += size.price;
    }

    const ingredsPrice = ingredients
      .map((ingr) => ingr.price)
      .reduce((total, prc) => total + prc, price);

    return ingredsPrice;
  }, [dough, ingredients, size]);

  const clearOrder = useCallback(() => {
    setIngredients([]);
    setDough({} as Dough);
    setSize({} as Size);
    setImageUrl('');
    setDailyRecommendation(false);
    setPoints(0);

    localStorage.removeItem(`${key}:ingredients`);
    localStorage.removeItem(`${key}:dough`);
    localStorage.removeItem(`${key}:size`);
    localStorage.removeItem(`${key}:image`);
    localStorage.removeItem(`${key}:recommendation`);
    localStorage.removeItem(`${key}:points`);
  }, []);

  const persistDough = useCallback((doughData: Dough) => {
    localStorage.setItem(`${key}:dough`, JSON.stringify(doughData));
    setDough(doughData);
  }, []);

  const persistIngredients = useCallback((ingredientsData: Ingredient[]) => {
    localStorage.setItem(`${key}:ingredients`, JSON.stringify(ingredientsData));
    setIngredients(ingredientsData);
  }, []);

  const persistSize = useCallback((sizeData: Size) => {
    localStorage.setItem(`${key}:size`, JSON.stringify(sizeData));
    setSize(sizeData);
  }, []);

  const persistDailyRecommendation = useCallback((daily: boolean) => {
    localStorage.setItem(`${key}:recommendation`, JSON.stringify(daily));
    setDailyRecommendation(daily);
  }, []);

  const persistImageUrl = useCallback((img: string) => {
    localStorage.setItem(`${key}:image`, JSON.stringify(img));
    setImageUrl(img);
  }, []);

  const persistPoints = useCallback((pts: number) => {
    localStorage.setItem(`${key}:points`, JSON.stringify(pts));
    setPoints(pts);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        ingredients,
        dough,
        size,
        imageUrl,
        dailyRecommendation,
        points,
        totalPrice,
        isComplete,
        isDoughComplete,
        isIngredientsComplete,
        setIngredients: persistIngredients,
        setDough: persistDough,
        setSize: persistSize,
        setImageUrl: persistImageUrl,
        setDailyRecommendation: persistDailyRecommendation,
        setPoints: persistPoints,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
