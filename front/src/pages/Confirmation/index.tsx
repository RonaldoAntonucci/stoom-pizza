import React, { useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useOrder from '../../hooks/useOrder';
import api from '../../services/api';

const Confirmation: React.FC = () => {
  const { push } = useHistory();

  const { dough, ingredients, size, dailyRecommendation, points } = useOrder();

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
    api.post('/order', { dough, size, ingredients }).then(() => push('/'));
  }, [dough, ingredients, push, size]);

  return (
    <div>
      <h1>Confirme seu pedido</h1>
      <p>massa: {dough.name}</p>
      <p>tamanho: {size.name}</p>
      <p>ingredientes: {ingredientsInline}</p>

      {dailyRecommendation && (
        <b>Confirmando o pedido você ganhará {points}!!</b>
      )}

      <Link to="/doughs">Início</Link>
      <button type="button" onClick={handleConfirmation}>
        Confirmar
      </button>
    </div>
  );
};

export default Confirmation;
