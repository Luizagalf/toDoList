import { makeAutoObservable } from "mobx";
import RootStore from "stores/index";
import { Note } from "types/Note";
import { Cols } from "types/Cols";

class notesStore {
  rootStore: RootStore;

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

  getItemsFromLocalStorage = () => {
    if (localStorage.getItem("cols") !== null) {
      this.columns = JSON.parse(localStorage.getItem("cols") as string);
    }
  };

  setColsInLocalStorage = (value: Cols) => {
    localStorage.setItem("cols", JSON.stringify(value));
    console.log(localStorage.getItem("cols"));
  };

  addNote(note: Note) {
    this.columns["requested"]["items"].push(note);
    this.setColsInLocalStorage(this.columns);
  }

  deleteNote(id: string, colId: string) {
    const newNotesList = this.columns[colId]["items"].filter((note) => {
      return note["id"] !== id;
    });
    this.columns[colId]["items"] = newNotesList;
    this.setColsInLocalStorage(this.columns);
  }

  setColumns = (newCols: {
    [key: string]: { name: string; items: Note[] };
  }) => {
    this.columns = newCols;
    this.setColsInLocalStorage(this.columns);
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

export default notesStore;
