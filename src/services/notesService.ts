import { Note } from "types/Note";
import { Cols } from "types/Cols";
import NotesStore from "stores/notesStore";
import INotesProvider from "providers/notesProvider";
export default class NotesService {
  constructor(
    private notesStore: NotesStore,
    private notesProvider: INotesProvider
  ) {}

  getItemsFromLocalStorage = (): void => {
    this.notesStore.setColumns(this.notesProvider.getItemsFromLocalStorage());
  };

  setColsInLocalStorage = (value: Cols): void => {
    this.notesProvider.setColsInLocalStorage(value);
  };

  addNewNote = (note: Note): void => {
    const newCols: Cols = this.notesStore.columns;
    newCols["requested"]["items"].push(note);
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };

  deleteNote = (id: string, colId: string): void => {
    const newCols: Cols = this.notesStore.columns;
    const newNotesList: Note[] = this.notesStore.columns[colId]["items"].filter(
      (note) => {
        return note["id"] !== id;
      }
    );

    newCols[colId]["items"] = newNotesList;
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };

  setColumns = (newCols: Cols): void => {
    this.notesStore.setColumns(newCols);
    this.setColsInLocalStorage(newCols);
  };
}
