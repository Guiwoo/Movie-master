import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoAtom } from "../atom";

const FormTodo = () => {
  const { register, handleSubmit, setValue } = useForm();
  const setTodos = useSetRecoilState(toDoAtom);
  const onValid = handleSubmit(({ toDo }) => {
    setTodos((prev) => [
      ...prev,
      { text: toDo, id: Date.now(), category: "Todo" },
    ]);
    setValue("toDo", "");
  });
  return (
    <form onSubmit={onValid}>
      <input
        {...register("toDo", {
          required: "Please Write a Todo Message",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default FormTodo;
