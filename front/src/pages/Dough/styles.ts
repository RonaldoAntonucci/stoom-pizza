import styled from 'styled-components';
import { lighten, shade } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  padding: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;

  b {
    color: ${colors.success};
  }
`;

export const RecommendationContainer = styled.div`
  margin-bottom: 40px;
  background-color: ${lighten(0.02, colors.background)};

  h1 {
    color: ${colors.success};
    margin-bottom: 16px;
    font-size: 40px;
    font-weight: bold;
  }

  p {
    font-size: 18px;
    margin-bottom: 8px;
  }

  border: 3px solid ${colors.success};
  border-radius: 8px;
  padding: 20px;

  button {
    height: 48px;
    padding: 16px;
    background-color: ${colors.success};
    border: 0;
    border-radius: 8px;
    color: ${colors.neutral};

    font-weight: bold;
    font-size: 18px;

    &:hover {
      color: ${shade(0.2, colors.success)};
    }
  }
`;
