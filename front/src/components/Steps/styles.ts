import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

interface BallProps {
  complete: boolean;
  selected: boolean;
}

interface BarProps {
  complete: boolean;
}

export const Container = styled.div`
  height: 140px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.title};
  }

  > div {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
`;

export const BallContent = styled.button<BallProps>`
  display: flex;
  flex-direction: column;
  height: 100px;
  background: transparent;
  border: 0;

  justify-content: center;
  align-items: center;
  text-decoration: none;

  color: ${(props) => {
    if (props.selected) {
      return colors.neutral;
    }

    return props.complete ? colors.success : colors.neutral;
  }};
  font-weight: bold;
`;

export const Ball = styled.div<BallProps>`
  height: 30px;
  width: 30px;
  background-color: ${(props) => {
    if (props.selected) {
      return colors.neutral;
    }

    return props.complete ? colors.success : colors.neutral;
  }};
  margin: 0;
  border-radius: 50%;
  border: 2px solid
    ${(props) => {
    if (props.selected) {
      return shade(0.2, colors.neutral);
    }

    return props.complete
      ? shade(0.2, colors.success)
      : shade(0.2, colors.neutral);
  }};

  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => {
    let color = colors.neutral;

    if (props.complete) {
      color = colors.success;
    }

    if (props.selected) {
      color = colors.neutral;
    }

    return shade(0.2, color);
  }};
  }
`;

export const Label = styled.label`
  margin-top: 16px;
`;

export const Bar = styled.div<BarProps>`
  height: 4px;
  flex: 1;
  border: 0.1px solid;
  border-radius: 4px;
  background-color: ${(props) =>
    props.complete ? colors.success : 'transparent'};

  border-color: ${(props) =>
    props.complete ? shade(0.2, colors.success) : shade(0.2, colors.neutral)};

  margin-bottom: 35px;
`;
