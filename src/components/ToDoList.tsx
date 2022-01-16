import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CategoryEnum, categoryState, toDoAtom, toDoSelecor } from "../atom";
import FormTodo from "./FormTodo";
import ListTodo from "./ListTodo";

const ToDoList = () => {
  const [todos] = useRecoilValue(toDoSelecor);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={CategoryEnum.Todo}>To Do</option>
        <option value={CategoryEnum.Doing}>Doing</option>
        <option value={CategoryEnum.Done}>Done</option>
      </select>
      <FormTodo />
      {todos?.map((a) => (
        <ListTodo key={a.id} {...a} />
      ))}
    </div>
  );
};

export default ToDoList;
