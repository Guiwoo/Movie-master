import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoAtom } from "../atom";

const FormTodo = () => {
  const { register, handleSubmit, setValue } = useForm();
  const setTodos = useSetRecoilState(toDoAtom);
  const category = useRecoilValue(categoryState);
  const onValid = handleSubmit(({ toDo }) => {
    setTodos((prev) => [...prev, { text: toDo, id: Date.now(), category }]);
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
