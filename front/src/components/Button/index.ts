import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

export default styled.button`
  padding: 8px;
  border: 0;
  background-color: ${colors.success};
  color: ${colors.neutral};
  font-weight: bold;
  border-radius: 8px;
  font-size: 18px;

  align-self: flex-end;
  width: fit-content;

  &:hover {
    background-color: ${shade(0.2, colors.success)};
  }
`;
