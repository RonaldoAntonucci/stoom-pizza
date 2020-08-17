import React, { useCallback, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Container, BallContent, Ball, Label, Bar } from './styles';
import useOrder from '../../hooks/useOrder';
import formatPrice from '../../utils/formatValue';

const Steps: React.FC = () => {
  const {
    dough,
    ingredients,
    size,
    isIngredientsComplete,
    isDoughComplete,
    isComplete,
    totalPrice,
  } = useOrder();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const handleClickIngredients = useCallback(() => {
    if (!isDoughComplete) {
      return;
    }

    push('/ingredients');
  }, [isDoughComplete, push]);

  const handleClickSizes = useCallback(() => {
    if (!isIngredientsComplete) {
      return;
    }

    push('/size');
  }, [isIngredientsComplete, push]);

  const handleClickConfirmation = useCallback(() => {
    if (!isComplete) {
      return;
    }

    push('/confirmation');
  }, [isComplete, push]);

  return (
    <Container>
      <div>
        <BallContent
          type="button"
          onClick={() => push('/')}
          selected={pathname === '/' || pathname === '/doughs'}
          complete={!!dough.id}
        >
          <Ball
            selected={pathname === '/' || pathname === '/doughs'}
            complete={!!dough.id}
          />
          <Label>Massas</Label>
        </BallContent>
        <Bar complete={!!dough.id} />
        <BallContent
          type="button"
          onClick={handleClickIngredients}
          selected={pathname === '/ingredients'}
          complete={ingredients.length > 0}
        >
          <Ball
            selected={pathname === '/ingredients'}
            complete={ingredients.length > 0}
          />
          <Label>Ingredientes</Label>
        </BallContent>
        <Bar complete={!!dough.id && ingredients.length > 0} />
        <BallContent
          type="button"
          onClick={handleClickSizes}
          selected={pathname === '/size'}
          complete={!!size.id}
        >
          <Ball selected={pathname === '/size'} complete={!!size.id} />
          <Label>Tamanho</Label>
        </BallContent>
        <Bar complete={!!dough.id && ingredients.length > 0 && !!size.id} />
        <BallContent
          type="button"
          onClick={handleClickConfirmation}
          selected={pathname === '/confirmation'}
          complete={false}
        >
          <Ball selected={pathname === '/confirmation'} complete={false} />
          <Label>Confirmar</Label>
        </BallContent>
      </div>
      <h1>TOTAL: {formatPrice(totalPrice)}</h1>
    </Container>
  );
};

export default memo(Steps);
