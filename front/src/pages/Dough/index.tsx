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
  ingredients: [{ id: string; name: string }];
}

const Dough: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { setDough, setIngredients } = useOrder();
  const { push } = useHistory();

  const [apiDoughs, setApiDoughs] = useState<Dough[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );

  useEffect(() => {
    api.get<Dough[]>('/doughs').then((response) => setApiDoughs(response.data));

    api
      .get<Recommendation>('/recommendation')
      .then((response) => setRecommendation(response.data));
  }, []);

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
      console.log(selectedDough);
      setDough(apiDoughs[selectedDough]);
      push('/ingredients');
    },
    [push, setDough, apiDoughs],
  );

  const handleSelectRecommendation = useCallback(() => {
    if (recommendation) {
      setDough(recommendation.dough);
      setIngredients(recommendation.ingredients);

      push('/size');
    }
  }, [recommendation, setDough, setIngredients, push]);

  return (
    <div>
      {recommendation && (
        <div>
          <h1>Pizza do dia</h1>

          <p>Nome: {recommendation.name}</p>
          <p>Massa: {recommendation.dough.name}</p>
          <p>Ingredientes: {recommendationIngredients}</p>

          <button onClick={handleSelectRecommendation} type="button">
            Selecionar
          </button>
        </div>
      )}

      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="doughs"
          options={checkboxDoughsOptions}
          multiple={false}
        />
        <button type="submit">Continuar</button>
      </Form>
    </div>
  );
};

export default Dough;
