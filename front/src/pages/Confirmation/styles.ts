import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${colors.title};
  background-color: ${lighten(0.03, colors.background)};

  h1 {
    color: ${colors.title};
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 4px;

    b {
      color: ${colors.title};
    }
  }

  > b {
    margin-top: 8px;
    color: ${colors.success};
    font-size: 18px;
  }

  > div {
    width: 100%;
    display: flex;

    justify-content: center;
    align-items: center;

    background-color: ${lighten(0.01, colors.background)};
    border-radius: 16px;

    margin-bottom: 16px;

    img {
      border: 2px solid ${colors.title};
      height: 150px;
      width: 150px;
      border-radius: 50%;
      margin: 20px;
    }
  }
`;
