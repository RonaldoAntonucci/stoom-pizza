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

import { Container, RecommendationContainer } from './styles';

interface Dough {
  id: string;
  name: string;
  description: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface Recommendation {
  name: string;
  dough: {
    id: string;
    name: string;
  };
  points: number;
  ingredients: [{ id: string; name: string }];
}

const Dough: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    setDough,
    setIngredients,
    setDailyRecommendation,
    setPoints,
  } = useOrder();
  const { push } = useHistory();

  const [apiDoughs, setApiDoughs] = useState<Dough[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );

  useEffect(() => {
    setDailyRecommendation(false);
    setPoints(0);
    api.get<Dough[]>('/doughs').then((response) => setApiDoughs(response.data));

    api
      .get<Recommendation>('/recommendation')
      .then((response) => setRecommendation(response.data));
  }, [setDailyRecommendation, setPoints]);

  const checkboxDoughsOptions = useMemo<CheckboxOption[]>(
    () =>
      apiDoughs.map((dough) => ({
        id: dough.id,
        value: dough.name,
        label: dough.name,
        description: dough.description,
      })),
    [apiDoughs],
  );

  const recommendationIngredients = useMemo(() => {
    if (!recommendation) {
      return '';
    }

    let ingredientsStr = '';
    recommendation.ingredients.forEach((ingredient, index) => {
      ingredientsStr +=
        index === recommendation.ingredients.length - 1
          ? `${ingredient.name}.`
          : `${ingredient.name}, `;
    });

    return ingredientsStr;
  }, [recommendation]);

  const handleNext = useCallback(
    (data) => {
      const selectedDough = apiDoughs
        .map((dough) => dough.name)
        .indexOf(data.doughs[0]);
      setDough(apiDoughs[selectedDough]);
      push('/ingredients');
    },
    [push, setDough, apiDoughs],
  );

  const handleSelectRecommendation = useCallback(() => {
    if (recommendation) {
      setDough(recommendation.dough);
      setIngredients(recommendation.ingredients);
      setDailyRecommendation(true);
      setPoints(recommendation.points);

      push('/size');
    }
  }, [
    recommendation,
    setDough,
    setIngredients,
    setDailyRecommendation,
    setPoints,
    push,
  ]);

  return (
    <Container>
      {recommendation && (
        <RecommendationContainer>
          <h1>Pizza do dia</h1>

          <p>
            <b>Nome: </b>
            {recommendation.name}
          </p>
          <p>
            <b>Massa: </b>
            {recommendation.dough.name}
          </p>
          <p>
            <b>Ingredientes: </b>
            {recommendationIngredients}
          </p>

          <p>
            Ganhe <b>{recommendation.points} pontos</b> ao concluir o seu
            pedido!!
          </p>

          <button onClick={handleSelectRecommendation} type="button">
            Aproveitar!!
          </button>
        </RecommendationContainer>
      )}

      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="doughs"
          options={checkboxDoughsOptions}
          multiple={false}
        />
      </Form>
      <Button type="button" onClick={() => formRef.current?.submitForm()}>
        Selecionar
      </Button>
    </Container>
  );
};

export default Dough;
