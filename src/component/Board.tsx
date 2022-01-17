import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "./DragCard";

const SBoard = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  todo: string[];
  boardId: string;
}
const Title = styled.h2`
  color: white;
  font-size: 22px;
`;

const Board = ({ todo, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <SBoard ref={provided.innerRef} {...provided.droppableProps}>
          <Title>{boardId}</Title>
          {todo.map((e, index) => (
            <DragCard key={e} e={e} index={index} />
          ))}
          {provided.placeholder}
        </SBoard>
      )}
    </Droppable>
  );
};

export default Board;
