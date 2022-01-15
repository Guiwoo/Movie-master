import { atom } from "recoil";

export interface ItoDoState {
    text: string;
    id: number;
    category: "Todo" | "Doing" | "Done";
  }
  
export const toDoAtom = atom<ItoDoState[]>({
key: "to_Do",
default: [],
});
