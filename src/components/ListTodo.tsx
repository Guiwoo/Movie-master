import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryEnum, ItoDoState, toDoAtom, toDoSelecor } from "../atom";

const ListTodo = ({ text, category, id }: ItoDoState) => {
  const setToDos = useSetRecoilState(toDoAtom);
  const onClick = (newCat: ItoDoState["category"]) => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((e) => e.id === id);
      const updateTodo = { id, text, category: newCat };
      return [
        ...oldTodos.slice(0, targetIndex),
        updateTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  /**
   * const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
   *    const {currentTarget:{name}}=e
   * }
   */
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div
        style={{
          marginRight: "15px",
          display: "flex",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        <li>{text}</li>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {category !== CategoryEnum.Doing && (
          <button onClick={() => onClick(CategoryEnum.Doing)}>Doing</button>
        )}
        {category !== CategoryEnum.Todo && (
          <button onClick={() => onClick(CategoryEnum.Todo)}>To Do</button>
        )}
        {category !== CategoryEnum.Done && (
          <button onClick={() => onClick(CategoryEnum.Done)}>Done</button>
        )}
      </div>
    </div>
  );
};

export default ListTodo;
