import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import useOrder from '../../hooks/useOrder';

const Confirmation: React.FC = () => {
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
    </div>
  );
};

export default Confirmation;
