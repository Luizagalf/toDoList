/* eslint-disable @typescript-eslint/no-unused-vars */
import "./addNewNote.css";
import { useState, useEffect } from "react";
import plus from "img/plus.png";
import { Formik, Form, Field } from "formik";
import uuid from "react-uuid";

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

  var date = String(new Date().toLocaleDateString("ru-RU"));

  return (
    <div className="note">
      {isOpen ? (
        <div className="note-open">
          <h4 className="note-open_title">Add new note</h4>
          <Formik
            initialValues={{
              id: uuid(),
              title: "",
              text: "",
              priority: "1",
              date: String(new Date().toLocaleDateString("ru-RU"))
            }}
            validateOnBlur
            onSubmit={async (values) => {
              await console.log(values);
            }}
            // validationSchema={refreshUserDataMain}
          >
            {({
              values,
              errors,
              touched,
              setFieldTouched,
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

                {values.date}

                <div>
                  <button
                    type="submit"
                    // disabled={!dirty}
                    // onClick={(values) => handleSubmit(values)}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="note-close" onClick={() => setIsOpen(!isOpen)}>
          <img src={plus} alt="" className="note-close_img" />
          <h4 className="note-close_title">Add new note</h4>
        </div>
      )}
    </div>
  );
};

export default AddNewNote;
