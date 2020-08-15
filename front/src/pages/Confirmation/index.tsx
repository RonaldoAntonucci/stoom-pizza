import React, { useMemo } from 'react';
import useOrder from '../../hooks/useOrder';

const Confirmation: React.FC = () => {
  const { order } = useOrder();

  const ingredientsInline = useMemo(() => order.ingredients.join(', '), [
    order.ingredients,
  ]);

  return (
    <div>
      <h1>Confirme seu pedido</h1>

      <p>massa: {order.dough}</p>
      <p>tamanho: {order.size}</p>
      <p>ingredientes: {ingredientsInline}</p>
    </div>
  );
};

export default Confirmation;
