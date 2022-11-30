import "./app.scss";
import { useEffect } from "react";
import { useStores } from "stores";

import Notes from "components/Notes";
// import Forecast from "components/Forecast";
import AddNewNote from "components/AddNewNote";

const App = () => {
  const { notesStore } = useStores();

  useEffect(() => {
    notesStore.getItemsFromLocalStorage();
  }, []);

  return (
    <div className="app" id="app">
      <h1 className="app_title">To Do List</h1>
      <div>
        <div>
          <AddNewNote />
          <Notes />
        </div>
        {/* <Forecast /> */}
      </div>
    </div>
  );
};

export default App;
