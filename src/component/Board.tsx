import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atom";
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
  todos: ITodo[];
  boardId: string;
}
const Title = styled.h2`
  color: white;
  font-size: 22px;
`;
interface IArea {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IArea>`
  padding: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "pink" : "#00d8d6")};
  opacity: ${(props) => (props.draggingFromThisWith ? 0.6 : 1)};
  flex-grow: 1;
`;

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const Board = ({ todos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newTodo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <SBoard>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((e, index) => (
              <DragCard
                key={e.id}
                toDoId={e.id}
                index={index}
                toDoText={e.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </SBoard>
  );
};

export default Board;
