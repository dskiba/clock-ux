import styled from "styled-components";

const clockSize = "600";
const clockBorderSize = "10";
const clockCenterSize = "20";
const clockHandSize = "8";
const clockTickSize = clockHandSize;
const clockColor = "white";
const clockBorderColor = "black";
const clockHandColor = "black";
const clockHandSecColor = "red";
const clockTickColor = "lightgray";

export const Clock = styled.div`
  position: relative;
  width: ${clockSize}px;
  height: ${clockSize}px;
  background-color: ${clockColor};
  border: ${clockBorderSize}px solid ${clockBorderColor};
  border-radius: 100%;
  transform: rotate(180deg);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: ${clockCenterSize}px;
    height: ${clockCenterSize}px;
    border: ${clockBorderSize / 2}px solid ${clockColor};
    background-color: ${clockHandColor};
    border-radius: 100%;
    z-index: 99;
  }
`;

const clockHand = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  margin: auto;
  height: ${clockHandSize}px;
  background-color: ${clockHandColor};
  transform-origin: 0;
  transition: transform cubic-bezier(0.1, 2.5, 0.5, 1);
`;

export const clockHour = styled(clockHand)`
  width: calc(50% - ${clockSize / 4}px);
  transform: ${props => `rotate(${90 + (360 / 60) * props.deg}deg)`};
`;

export const clockMinute = styled(clockHand)`
  width: calc(50% - ${clockSize / 6}px);
  transform: ${props => `rotate(${90 + (360 / 60) * props.deg}deg)`};
`;

export const clockSecond = styled(clockHand)`
  width: calc(50% - ${clockSize / 10}px);
  height: ${clockHandSize / 2}px;
  background-color: ${clockHandSecColor};
  transform: ${props => `rotate(${90 + (360 / 60) * props.deg}deg)`};
`;

export const clockTick = styled.span`
  display: block;
  position: absolute;
  top: ${clockBorderSize}px;
  left: 50%;
  width: ${clockTickSize / 4}px;
  height: ${clockTickSize}px;
  background-color: ${clockTickColor};
  transform-origin: 0 ${clockSize / 2 - clockBorderSize}px;

  &:nth-child(${props => props.d}) {
    transform: ${props => `rotate(${180 + 6 * (props.d + 1) - 6}deg)`};
  }
`;

export const Number = styled.span`
  position: absolute;
  transform: ${props => `rotate(${0 - (props.d + 1) * 6}deg)`};
  font: ${props => {
    const { isHour, isMin, isSec } = props;
    if (isHour || isMin || isSec) return "bold 18px sans-serif";
    return "initial";
  }};
  color: ${props => {
    const { isHour, isMin, isSec } = props;
    if (isHour) return "hotpink";
    if (isMin) return "green";
    if (isSec) return "red";
    return "black";
  }};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  display: block;
  min-height: 60px;
  min-width: 100px;
  margin-right: 20px;
`;
