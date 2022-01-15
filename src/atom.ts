import { atom } from "recoil";

type CategoryType = "Todo" | "Doing" | "Done";

export interface ItoDoState {
    text: string;
    id: number;
    category: CategoryType;
  }
  
export const toDoAtom = atom<ItoDoState[]>({
key: "to_Do",
default: [],
});
