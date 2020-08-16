import styled from 'styled-components';

import colors from '../../styles/colors';

interface BallProps {
  complete: boolean;
  selected: boolean;
}

interface BarProps {
  complete: boolean;
}

export const Container = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const BallContent = styled.button`
  display: flex;
  flex-direction: column;
  height: 100px;
  background: transparent;
  border: 0;

  justify-content: center;
  align-items: center;
  overflow: visible;
`;

export const Ball = styled.div<BallProps>`
  height: 30px;
  width: 30px;
  background-color: ${(props) => {
    if (props.selected) {
      return colors.neutral;
    }

    return props.complete ? colors.success : colors.error;
  }};
  margin: 0;
  border-radius: 50%;
  border: 0;
`;

export const Label = styled.label`
  position: relative;

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
    props.complete ? colors.success : colors.neutral};

  margin-bottom: 35px;
`;
