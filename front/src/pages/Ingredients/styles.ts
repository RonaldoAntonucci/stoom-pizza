import styled from 'styled-components';

import colors from '../../styles/colors';
import appearFromLeft from '../../styles/appearFromLeft';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 40px;

  animation: ${appearFromLeft} 1s;

  h1 {
    color: ${colors.title};
    margin-bottom: 16px;
    font-size: 40px;
  }
`;
