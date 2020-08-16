import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import useOrder from '../../hooks/useOrder';

import CheckboxInput from '../../components/CheckboxInput';

import { Container } from './styles';

interface Ingredient {
  id: string;
  name: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Ingredients: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { setIngredients, setDailyRecommendation, setPoints } = useOrder();
  const { push } = useHistory();

  const [apiIngredients, setApiIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    setDailyRecommendation(false);
    setPoints(0);

    api
      .get<Ingredient[]>('/ingredients')
      .then((response) => setApiIngredients(response.data));
  }, [setDailyRecommendation, setPoints]);

  const checkboxIngredientsOptions = useMemo<CheckboxOption[]>(
    () =>
      apiIngredients.map((ingredient) => ({
        id: ingredient.id,
        value: ingredient.name,
        label: ingredient.name,
      })),
    [apiIngredients],
  );

  const handleNext = useCallback(
    (data) => {
      const ingredientNames = apiIngredients.map(
        (ingredient) => ingredient.name,
      );

      const selectedIngredients = data.ingredients.map(
        (ingredientName: string) => {
          const ingredientIndex = ingredientNames.indexOf(ingredientName);
          return apiIngredients[ingredientIndex];
        },
      );

      setIngredients(selectedIngredients);
      push('/size');
    },
    [apiIngredients, push, setIngredients],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="ingredients"
          options={checkboxIngredientsOptions}
        />
        <button type="submit">Continuar</button>
      </Form>
    </Container>
  );
};

export default Ingredients;
