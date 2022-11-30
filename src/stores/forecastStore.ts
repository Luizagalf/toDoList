import { makeAutoObservable } from "mobx";
import RootStore from "stores/index";

class forecastStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

export default forecastStore;
