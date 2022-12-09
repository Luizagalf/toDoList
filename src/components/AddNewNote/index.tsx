import "./addNewNote.scss";
import { useState, useEffect } from "react";
import plus from "assets/img/plus.png";
import AddNewNoteForm from "components/AddNewNote/AddNewNoteForm";

const AddNewNote = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="note">
      <div className="note--close" onClick={(): void => setIsOpen(!isOpen)}>
        <img src={plus} alt="" className="note--close__img" />
        <h3>Add new note</h3>
      </div>
      {isOpen ? <AddNewNoteForm isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
    </div>
  );
};

export default AddNewNote;
