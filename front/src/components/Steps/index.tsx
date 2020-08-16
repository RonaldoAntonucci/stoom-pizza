import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Container, BallContent, Ball, Label, Bar } from './styles';
import useOrder from '../../hooks/useOrder';

const Steps: React.FC = () => {
  const { dough, ingredients, size } = useOrder();
  const { pathname } = useLocation();
  const { push } = useHistory();

  return (
    <Container>
      <BallContent type="button" onClick={() => push('/')}>
        <Ball
          selected={pathname === '/' || pathname === '/doughs'}
          complete={!!dough.id}
        />
        <Label>Massas</Label>
      </BallContent>
      <Bar complete={!!dough.id} />
      <BallContent type="button" onClick={() => push('/ingredients')}>
        <Ball
          selected={pathname === '/ingredients'}
          complete={ingredients.length > 0}
        />
        <Label>Ingredientes</Label>
      </BallContent>
      <Bar complete={!!dough.id && ingredients.length > 0} />
      <BallContent type="button" onClick={() => push('/size')}>
        <Ball selected={pathname === '/size'} complete={!!size.id} />
        <Label>Tamanho</Label>
      </BallContent>
      <Bar complete={!!dough.id && ingredients.length > 0 && !!size.id} />
      <BallContent type="button" onClick={() => push('/confirmation')}>
        <Ball selected={pathname === '/confirmation'} complete={false} />
        <Label>Confirmar</Label>
      </BallContent>
    </Container>
  );
};

export default Steps;
