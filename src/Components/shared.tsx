import styled from "styled-components";

type MainTitleProps = {
  titleHead: string;
};

const Title = styled.h1`
  padding-left: 20px;
  font-size: 24px;
  font-weight: 500;
  font-family: "Neonderthaw", cursive;
`;

export const MainTitle = ({ titleHead }: MainTitleProps) => (
  <Title>{titleHead}</Title>
);

const StatBoxes = styled.div`
  display: flex;
  padding-right: 20px;
  justify-content: flex-end;
`;
const StatBox = styled.div<{ current: boolean }>`
  background-color: ${(props) => props.theme.white.darker};
  margin: 0 2px;
  width: 8px;
  height: 4px;
  background-color: ${(props) =>
    props.current ? "red" : props.theme.black.darker};
  margin-top: -10px;
  margin-bottom: 10px;
`;
type BoxProps = {
  maxIndex: number;
  index: number;
};
export const StatusBox = ({ maxIndex, index }: BoxProps) => {
  let sample: number[] = [];
  for (let i = 0; i < maxIndex; i++) {
    sample.push(i);
  }
  return (
    <StatBoxes>
      {sample.map((e) => (
        <StatBox key={e} current={e === index}></StatBox>
      ))}
    </StatBoxes>
  );
};