import { createContext, Context } from "react";

import NotesStore from "stores/notesStore";
import NotesService from "services/notesService";

export interface IStoresContext {
  notesStore: NotesStore;
}

export interface IServicesContext {
  notesService: NotesService;
}

const StoresContext = createContext<IStoresContext | null>(
  null
) as Context<IStoresContext>;

const ServicesContext = createContext<IServicesContext | null>(
  null
) as Context<IServicesContext>;

export { StoresContext, ServicesContext };

export function initContextsValues() {
  const stores: IStoresContext = {
    notesStore: new NotesStore()
  };

  const services: IServicesContext = {
    notesService: new NotesService(stores.notesStore)
  };

  return {
    stores,
    services
  };
}
