import styled from 'styled-components';

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
  }

  border-radius: 8px;
  border: 2px solid ${colors.title};
`;
