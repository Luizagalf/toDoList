import ForecastStore from "./forecastStore";
import NotesStore from "./notesStore";
import { createContext, useContext } from "react";

export default class RootStore {
  forecastStore: ForecastStore;
  notesStore: NotesStore;

  constructor() {
    this.forecastStore = new ForecastStore(this);
    this.notesStore = new NotesStore(this);
  }
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
