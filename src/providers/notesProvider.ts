import { Cols } from "types/Cols";

export interface INotesProvider {
  getItemsFromLocalStorage(): Cols;
  setColsInLocalStorage(value: Cols): void;
}

export default class notesProvider implements INotesProvider {
  getItemsFromLocalStorage = (): Cols => {
    if (localStorage.getItem("cols") !== null) {
      return JSON.parse(localStorage.getItem("cols") as string);
    }
    return {
      requested: {
        name: "Requested",
        items: []
      },
      toDo: {
        name: "To do",
        items: []
      },
      inProgress: {
        name: "In Progress",
        items: []
      },
      done: {
        name: "Done",
        items: []
      }
    };
  };

  setColsInLocalStorage = (value: Cols): void => {
    localStorage.setItem("cols", JSON.stringify(value));
  };
}
