import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

interface ButtonProps {
  align?: 'start' | 'end';
  color?: 'red' | 'green';
}

export default styled.button<ButtonProps>`
  padding: 8px;
  border: 0;
  background-color: ${(props) =>
    props.color && props.color === 'red' ? colors.error : colors.success};
  color: ${colors.neutral};
  font-weight: bold;
  border-radius: 8px;
  font-size: 18px;

  align-self: ${(props) =>
    props.align && props.align === 'start' ? 'flex-start' : 'flex-end'};
  width: fit-content;

  &:hover {
    background-color: ${shade(0.2, colors.success)};
  }
`;
