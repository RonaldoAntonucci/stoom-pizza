import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 16px;

    background-color: ${lighten(0.02, colors.background)};
    border-radius: 8px;
    padding: 16px;
  }
`;

export const Label = styled.label`
  margin: 8px 0;
  display: flex;
  align-items: center;

  input {
    margin-right: 16px;
  }

  input[type='checkbox'] {
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    padding: 10px;
  }
`;

export const InputContent = styled.div`
  h2 {
    color: ${colors.title};
    font-weight: bold;
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }
`;
