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
import Button from '../../components/Button';
import Footer from '../../components/Footer';

import { Container } from './styles';
import useToast from '../../hooks/useToast';

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
  const { addToast } = useToast();

  const [apiIngredients, setApiIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    setDailyRecommendation(false);
    setPoints(0);

    api
      .get<Ingredient[]>('/ingredients')
      .then((response) => setApiIngredients(response.data))
      .catch(() => {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description:
            'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        });
      });
  }, [addToast, setDailyRecommendation, setPoints]);

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
      if (data.ingredients.length < 1) {
        addToast({
          title: 'Selecione os ingredientes',
          description: 'Por favor, selecione os ingredientes para continuar',
          type: 'error',
        });
        return;
      }

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
    [addToast, apiIngredients, push, setIngredients],
  );

  return (
    <Container>
      <h1>Selecione os ingredientes:</h1>

      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="ingredients"
          options={checkboxIngredientsOptions}
        />
      </Form>
      <Footer>
        <Button
          type="button"
          align="start"
          color="neutral"
          onClick={() => push('/doughs')}
        >
          Voltar
        </Button>
        <Button type="button" onClick={() => formRef.current?.submitForm()}>
          Selecionar
        </Button>
      </Footer>
    </Container>
  );
};

export default Ingredients;
