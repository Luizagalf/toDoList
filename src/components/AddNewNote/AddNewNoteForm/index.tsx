import "./addNewNoteForm.scss";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import uuid from "react-uuid";
import { validationSchema } from "./validation";
import fire from "assets/img/fire.svg";
import { ReactComponent as IconClose } from "assets/img/iconClose.svg";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { Note } from "types/Note";

type ModalFormProps = {
  isOpen: boolean;
  setIsOpen: (el: boolean) => void;
};

const AddNewNoteForm = ({ isOpen, setIsOpen }: ModalFormProps) => {
  const { notesStore } = useStores();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="note--open">
      <div>
        <div className="note--open__title">
          <h3>Add new note</h3>
          <IconClose
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <Formik
          initialValues={{
            id: uuid(),
            title: "",
            text: "",
            priority: "2",
            date: String(new Date().toLocaleDateString("ru-RU"))
          }}
          validateOnBlur
          onSubmit={(values: Note) => {
            notesStore.addNote(values);
            setIsOpen(!isOpen);
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            setFieldValue,
            isValid,
            handleSubmit,
            dirty,
            setFieldTouched
          }) => (
            <Form className="note--open__form" onSubmit={handleSubmit}>
              <Field
                name="title"
                type="text"
                className="note--open__form-title"
                placeholder="Header"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("title", event.target.value);
                  setFieldTouched("title");
                }}
              />
              <Field
                name="text"
                type="text"
                as="textarea"
                className="note--open__form-text"
                placeholder="Description"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("text", event.target.value);
                  setFieldTouched("text");
                }}
              />
              <div className="note--open__form-footer">
                <div className="note--open__form-fires">
                  Priority:
                  <img
                    src={fire}
                    alt="priority"
                    style={{
                      filter:
                        "invert(11%) sepia(91%) saturate(6739%) hue-rotate(8deg) brightness(80%) contrast(114%)",
                      transform: values.priority === "1" ? "scale(1.2)" : ""
                    }}
                    onClick={() => setFieldValue("priority", "1")}
                  />
                  <img
                    src={fire}
                    alt="priority"
                    style={{
                      filter:
                        "invert(55%) sepia(88%) saturate(1894%) hue-rotate(359deg) brightness(100%) contrast(105%)",
                      transform: values.priority === "2" ? "scale(1.4)" : ""
                    }}
                    onClick={() => setFieldValue("priority", "2")}
                  />
                  <img
                    src={fire}
                    alt="priority"
                    style={{
                      filter:
                        "invert(98%) sepia(6%) saturate(2935%) hue-rotate(350deg) brightness(114%) contrast(105%)",
                      transform: values.priority === "3" ? "scale(1.2)" : ""
                    }}
                    onClick={() => setFieldValue("priority", "3")}
                  />
                </div>

                <p className="note--open__form-date">{values.date}</p>
              </div>
              <button
                type="submit"
                disabled={!isValid || !dirty}
                className="note--open__form-btn"
              >
                Add
              </button>
              <ErrorMessage name="title">
                {(msg) => <p className="note--open__form-error">{msg}</p>}
              </ErrorMessage>
              <ErrorMessage name="text">
                {(msg) => <p className="note--open__form-error">{msg}</p>}
              </ErrorMessage>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default observer(AddNewNoteForm);
