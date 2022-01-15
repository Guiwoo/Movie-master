import { useSetRecoilState } from "recoil";
import { ItoDoState, toDoAtom } from "../atom";

const ListTodo = ({ text, category, id }: ItoDoState) => {
  const setToDos = useSetRecoilState(toDoAtom);
  const onClick = (newCat: ItoDoState["category"]) => {};
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
        {category !== "Doing" && (
          <button onClick={() => onClick("Doing")}>Doing</button>
        )}
        {category !== "Todo" && (
          <button onClick={() => onClick("Todo")}>To Do</button>
        )}
        {category !== "Done" && (
          <button onClick={() => onClick("Done")}>Done</button>
        )}
      </div>
    </div>
  );
};

export default ListTodo;
