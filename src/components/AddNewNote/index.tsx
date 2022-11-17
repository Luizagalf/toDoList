/* eslint-disable @typescript-eslint/no-unused-vars */
import "./addNewNote.scss";
import { useState, useEffect } from "react";
import plus from "assets/img/plus.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import uuid from "react-uuid";
import { validationSchema } from "./validation";
import fire from "assets/img/fire.svg";
import { ReactComponent as IconClose } from "assets/img/iconClose.svg";

type Item = {
  id: string;
  title: string;
  text: string;
  priority: string;
  date: string;
};

type AddNewNoteProps = {
  columns: {
    [x: string]: {
      name: string;
      items: Item[];
    };
  };
  setColumns: (el: {
    [x: string]: {
      name: string;
      items: Item[];
    };
  }) => void;
};

const AddNewNote = ({ columns, setColumns }: AddNewNoteProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="note">
      {isOpen ? (
        <div className="note-open">
          <div className="note-open_title">
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
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              setFieldTouched,
              setFieldValue,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty
            }) => (
              <Form className="form">
                <Field
                  name="title"
                  type="text"
                  className="form-title"
                  placeholder="Header"
                />
                <Field
                  name="text"
                  type="text"
                  as="textarea"
                  className="form-text"
                  placeholder="Description"
                />
                <div className="form-footer">
                  <div className="form-footer__fires">
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

                  <p className="form-date">{values.date}</p>
                </div>
                <button
                  type="submit"
                  disabled={!isValid || !dirty}
                  onClick={() => {
                    handleSubmit();
                    setIsOpen(!isOpen);
                  }}
                  className="form-btn"
                >
                  Add
                </button>{" "}
                <ErrorMessage name="title">
                  {(msg) => <p className="form-title__error">{msg}</p>}
                </ErrorMessage>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="note-close" onClick={() => setIsOpen(!isOpen)}>
          <img src={plus} alt="" className="note-close_img" />
          <h3>Add new note</h3>
        </div>
      )}
    </div>
  );
};

export default AddNewNote;
