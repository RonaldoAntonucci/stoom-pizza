import React from 'react';
import { useLocation } from 'react-router-dom';

import { Container, BallContent, Ball, Label, Bar } from './styles';
import useOrder from '../../hooks/useOrder';

const Steps: React.FC = () => {
  const { dough, ingredients, size } = useOrder();

  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <Container>
      <BallContent type="button">
        <Ball
          selected={pathname === '/' || pathname === '/doughs'}
          complete={!!dough.id}
        />
        <Label>Massas</Label>
      </BallContent>
      <Bar />
      <BallContent type="button">
        <Ball
          selected={pathname === '/ingredients'}
          complete={ingredients.length > 0}
        />
        <Label>Ingredientes</Label>
      </BallContent>
      <Bar />
      <BallContent type="button">
        <Ball selected={pathname === '/size'} complete={!!size.id} />
        <Label>Tamanho</Label>
      </BallContent>
      <Bar />
      <BallContent type="button">
        <Ball selected={pathname === '/confirmation'} complete={false} />
        <Label>Confirmar</Label>
      </BallContent>
    </Container>
  );
};

export default Steps;
