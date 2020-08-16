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
import useToast from '../../hooks/useToast';

interface Dough {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
  description: string;
  image: string;
}

interface Recommendation {
  name: string;
  dough: {
    id: string;
    name: string;
  };
  imageUrl: string;
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
    setImageUrl,
  } = useOrder();
  const { push } = useHistory();
  const { addToast } = useToast();

  const [apiDoughs, setApiDoughs] = useState<Dough[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );

  useEffect(() => {
    setDailyRecommendation(false);
    setPoints(0);
    api
      .get<Dough[]>('/doughs')
      .then((response) => setApiDoughs(response.data))
      .catch(() => {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description:
            'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        });
      });

    api
      .get<Recommendation>('/recommendation')
      .then((response) => setRecommendation(response.data))
      .catch(() => {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description:
            'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        });
      });
  }, [addToast, setDailyRecommendation, setPoints]);

  const checkboxDoughsOptions = useMemo<CheckboxOption[]>(
    () =>
      apiDoughs.map((dough) => ({
        id: dough.id,
        value: dough.name,
        label: dough.name,
        description: dough.description,
        image: dough.imageUrl,
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
      if (data.doughs.length < 1) {
        addToast({
          title: 'Selecione a massa',
          description: 'Por favor, selecione a massa para continuar',
          type: 'error',
        });
        return;
      }

      const selectedDough = apiDoughs
        .map((dough) => dough.name)
        .indexOf(data.doughs[0]);
      setDough(apiDoughs[selectedDough]);
      setImageUrl(apiDoughs[selectedDough].imageUrl);
      push('/ingredients');
    },
    [apiDoughs, setDough, setImageUrl, push, addToast],
  );

  const handleSelectRecommendation = useCallback(() => {
    if (recommendation) {
      setDough(recommendation.dough);
      setIngredients(recommendation.ingredients);
      setImageUrl(recommendation.imageUrl);
      setDailyRecommendation(true);
      setPoints(recommendation.points);

      push('/size');
    }
  }, [
    recommendation,
    setDough,
    setIngredients,
    setImageUrl,
    setDailyRecommendation,
    setPoints,
    push,
  ]);

  return (
    <Container>
      {recommendation && (
        <RecommendationContainer>
          <h1>Pizza do dia</h1>

          <div>
            <img src={recommendation.imageUrl} alt={recommendation.name} />

            <div>
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
            </div>
          </div>

          <button onClick={handleSelectRecommendation} type="button">
            Aproveitar!!
          </button>
        </RecommendationContainer>
      )}

      <h1>Selecione um tipo de massa:</h1>

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
