import { makeAutoObservable } from "mobx";
import { Cols } from "types/Cols";
class notesStore {
  columns: Cols = {
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

  getColumns = (): Cols => {
    return this.columns;
  };

  setColumns = (newCols: Cols): void => {
    this.columns = newCols;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default notesStore;
