import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { MainTitle } from "../shared";

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -50px;
  margin-bottom: 20px;
`;
const NextBtn = styled.div`
  z-index: 11;
  padding-right: 20px;
  cursor: pointer;
  transition: all 1s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;

type TitleBoxProp = {
  increase: () => void;
  header: string;
};

export const TitleBox: React.FC<TitleBoxProp> = ({ increase, header }) => {
  return (
    <STitleBox>
      <MainTitle titleHead={header} />
      <NextBtn onClick={increase}>
        <FontAwesomeIcon icon={faChevronRight} />
      </NextBtn>
    </STitleBox>
  );
};
