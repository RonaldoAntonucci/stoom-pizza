import styled from 'styled-components';

import colors from '../../styles/colors';

interface BallAndBarProps {
  complete: boolean;
  selected: boolean;
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
  background: none;
  border: 0;

  justify-content: center;
  align-items: center;
  overflow: visible;
`;

export const Ball = styled.div<BallAndBarProps>`
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

export const Bar = styled.div`
  height: 2px;
  flex: 1;
  background-color: blue;

  margin-bottom: 35px;
`;
