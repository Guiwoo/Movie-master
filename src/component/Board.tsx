import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "./DragCard";

const SBoard = styled.div`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

interface IBoardProps {
  todo: string[];
  boardId: string;
}
const Title = styled.h2`
  color: white;
  font-size: 22px;
`;
const Area = styled.div<{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}>`
  padding: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "pink" : "#00d8d6")};
  opacity: ${(props) => (props.draggingFromThisWith ? 0.6 : 1)};
  flex-grow: 1;
`;

const Board = ({ todo, boardId }: IBoardProps) => {
  return (
    <SBoard>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todo.map((e, index) => (
              <DragCard key={e} e={e} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </SBoard>
  );
};

export default Board;
