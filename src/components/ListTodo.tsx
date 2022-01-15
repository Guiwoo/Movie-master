import { ItoDoState } from "../atom";

const ListTodo = ({ text }: ItoDoState) => {
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
        <button>To Do</button>
        <button>Doing</button>
        <button>Done</button>
      </div>
    </div>
  );
};

export default ListTodo;
