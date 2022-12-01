import NotesStore from "./notesStore";
import { createContext, useContext } from "react";

export default class RootStore {
  notesStore: NotesStore;

  constructor() {
    this.notesStore = new NotesStore(this);
  }
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
