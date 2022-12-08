import { Note } from "types/Note";
import { Cols } from "types/Cols";
import NotesStore from "stores/notesStore";

export default class NotesService {
  constructor(private notesStore: NotesStore) {}

  getItemsFromLocalStorage = (): void => {
    if (localStorage.getItem("cols") !== null) {
      this.notesStore.setColumns(
        JSON.parse(localStorage.getItem("cols") as string)
      );
    }
  };

  setColsInLocalStorage = (value: Cols): void => {
    localStorage.setItem("cols", JSON.stringify(value));
  };

  addNewNote = (note: Note): void => {
    const newCols: Cols = this.notesStore.getColumns();
    newCols["requested"]["items"].push(note);
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };

  deleteNote = (id: string, colId: string): void => {
    const newCols: Cols = this.notesStore.getColumns();
    const newNotesList: Note[] = this.notesStore
      .getColumns()
      [colId]["items"].filter((note) => {
        return note["id"] !== id;
      });

    newCols[colId]["items"] = newNotesList;
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };

  setColumns = (newCols: Cols): void => {
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };
}
