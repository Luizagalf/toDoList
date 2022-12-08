import "./app.scss";
import { useEffect } from "react";
import { useStores } from "stores";

import Notes from "components/Notes";
import AddNewNote from "components/AddNewNote";

const App = () => {
  const { notesStore } = useStores();

  useEffect(() => {
    notesStore.getItemsFromLocalStorage();
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">To Do List</h1>
      <AddNewNote />
      <Notes />
    </div>
  );
};

export default App;
