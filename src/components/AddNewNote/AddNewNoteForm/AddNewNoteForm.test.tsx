import { render } from "@testing-library/react";
import AddNewNoteForm from "./index";
import { initContextsValues, StoresContext, ServicesContext } from "context";
const contexts = initContextsValues();
const setIsOpen = jest.fn();

test("AddNewNoteForm renders without crashing", () => {
  render(
    <StoresContext.Provider value={contexts.stores}>
      <ServicesContext.Provider value={contexts.services}>
        <AddNewNoteForm isOpen={true} setIsOpen={setIsOpen} />
      </ServicesContext.Provider>
    </StoresContext.Provider>
  );
});
