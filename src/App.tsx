import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./component/Board";
import DragCard from "./component/DragCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [todo, setTodo] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodo((allBoards) => {
        const copy = [...allBoards[source.droppableId]];
        const taskObj = copy[source.index];
        copy.splice(source.index, 1);
        copy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: copy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setTodo((prev) => {
        const sourceBoard = [...prev[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...prev[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todo).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todo[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
