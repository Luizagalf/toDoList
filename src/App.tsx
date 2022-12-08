import "./app.scss";
import Notes from "components/Notes";
import AddNewNote from "components/AddNewNote";
import { initContextsValues, StoresContext, ServicesContext } from "./context";
const contexts = initContextsValues();

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">To Do List</h1>
      <StoresContext.Provider value={contexts.stores}>
        <ServicesContext.Provider value={contexts.services}>
          <AddNewNote />
          <Notes />
        </ServicesContext.Provider>
      </StoresContext.Provider>
    </div>
  );
};

export default App;
