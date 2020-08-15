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
  const { setIngredients } = useOrder();
  const { push } = useHistory();

  const [apiIngredients, setApiIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    api
      .get<Ingredient[]>('/ingredients')
      .then((response) => setApiIngredients(response.data));
  }, []);

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
      setIngredients(data.checkbox);
      push('/size');
    },
    [push, setIngredients],
  );

  return (
    <div>
      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput name="checkbox" options={checkboxIngredientsOptions} />
        <button type="submit">Continuar</button>
      </Form>
    </div>
  );
};

export default Ingredients;
