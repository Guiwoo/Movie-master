import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
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
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  const [todo, setTodo] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodo((prev) => {
      const copy = [...prev];
      copy.splice(source.index, 1);
      copy.splice(destination?.index, 0, draggableId);
      return copy;
    });
  };
  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Droppable droppableId={"one"}>
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {todo.map((e, index) => (
                    <DragCard key={e} e={e} index={index} />
                  ))}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
}

export default App;
