import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useOrder from '../../hooks/useOrder';
import api from '../../services/api';
import useToast from '../../hooks/useToast';

import Button from '../../components/Button';

import { Container, Card } from './styles';

const Confirmation: React.FC = () => {
  const { push } = useHistory();

  const {
    dough,
    ingredients,
    size,
    dailyRecommendation,
    points,
    clearOrder,
  } = useOrder();
  const { addToast } = useToast();

  const ingredientsInline = useMemo(() => {
    if (!ingredients) {
      return '';
    }

    let ingredientsStr = '';
    ingredients.forEach((ingredient, index) => {
      ingredientsStr +=
        index === ingredients.length - 1
          ? `${ingredient.name}.`
          : `${ingredient.name}, `;
    });

    return ingredientsStr;
  }, [ingredients]);

  const handleConfirmation = useCallback(() => {
    api.post('/order', { dough, size, ingredients }).then((response) => {
      addToast({
        type: 'success',
        title: 'Pedido confirmado',
        description: 'Seu pedido foi confirmado.',
      });

      if (response.data.dailyRecommendation) {
        addToast({
          type: 'success',
          title: 'Novos pontos adicionados',
          description: `Parabéns!! Vocẽ fez nosso pedido do dia e ganhou ${response.data.points} novos pontos bônus!`,
        });
      }

      clearOrder();
      push('/');
    });
  }, [addToast, clearOrder, dough, ingredients, push, size]);

  return (
    <Container>
      <Card>
        <h1>Confirme seu pedido</h1>
        <p>
          <b>massa: </b>
          {dough.name}
        </p>
        <p>
          <b>tamanho: </b>
          {size.name}
        </p>
        <p>
          <b>ingredientes: </b>
          {ingredientsInline}
        </p>

        {dailyRecommendation && (
          <b>Confirmando o pedido você ganhará {points}!!</b>
        )}
      </Card>
      <Button type="button" onClick={handleConfirmation}>
        Confirmar pedido
      </Button>
    </Container>
  );
};

export default Confirmation;
