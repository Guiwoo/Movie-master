import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  margin: 5px 0px;
  color: tomato;
  font-size: 22px;
`;

interface IProps {
  e: string;
  index: number;
}

const DragCard = ({ e, index }: IProps) => {
  return (
    <Draggable key={e} draggableId={e} index={index}>
      {(pro) => (
        <Card
          ref={pro.innerRef}
          {...pro.draggableProps}
          {...pro.dragHandleProps}
        >
          {e}
        </Card>
      )}
    </Draggable>
  );
};

export default DragCard;
