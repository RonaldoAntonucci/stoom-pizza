import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

interface ButtonProps {
  align?: 'start' | 'end';
  color?: 'red' | 'green';
  disabled?: boolean;
}

export default styled.button<ButtonProps>`
  padding: 8px;
  border: 0;
  background-color: ${(props) => {
    let color =
      props.color && props.color === 'red' ? colors.error : colors.success;

    if (props.disabled) {
      color = 'grey';
    }

    return color;
  }};

  color: ${colors.neutral};
  font-weight: bold;
  border-radius: 8px;
  font-size: 18px;
  transition: color 0.2s;

  align-self: ${(props) =>
    props.align && props.align === 'start' ? 'flex-start' : 'flex-end'};
  width: fit-content;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
  background-color: ${(props) => {
    const color =
      props.color && props.color === 'red' ? colors.error : colors.success;

    if (props.disabled) {
      return 'grey';
    }

    return shade(0.2, color);
  }};
  
`;
