import { useRecoilValue } from "recoil";
import { toDoAtom } from "../atom";
import FormTodo from "./FormTodo";
import ListTodo from "./ListTodo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoAtom);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <FormTodo />
      <ul>
        {toDos?.map((e) => (
          <ListTodo key={e.id} {...e} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
