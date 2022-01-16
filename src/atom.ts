import { atom,selector } from "recoil";

export enum CategoryEnum {
  "Todo"= "Todo",
  "Doing"="Doing",
  "Done"="Done"
}

export interface ItoDoState {
    text: string;
    id: number;
    category: CategoryEnum
  }

export const categoryState = atom<CategoryEnum>({
  key:"category",
  default:CategoryEnum.Todo
})
  
export const toDoAtom = atom<ItoDoState[]>({
key: "toDo",
default: [],
});

export const toDoSelecor = selector({
  key:"toDoSelector",
  get:({get})=>{
    const toDos = get(toDoAtom)
    const category = get(categoryState)
    return [toDos.filter((a)=>a.category === category)]
  },
})