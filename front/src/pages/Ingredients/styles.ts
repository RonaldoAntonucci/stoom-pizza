import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 40px;

  h1 {
    color: ${colors.title};
    margin-bottom: 16px;
    font-size: 40px;
  }
`;
