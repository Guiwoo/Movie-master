import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

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
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  margin: 5px 0px;
  color: tomato;
  font-size: 22px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const onDragEnd = () => {};
  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Droppable droppableId={"one"}>
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {toDos.map((e, index) => (
                    <Draggable key={index} draggableId={e} index={index}>
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
