/* eslint-disable @typescript-eslint/no-unused-vars */
import "./app.scss";
import uuid from "react-uuid";
import { useState, useEffect } from "react";

import Notes from "components/Notes";
import Forecast from "components/Forecast";
import AddNewNote from "components/AddNewNote";

const notes = [
  {
    id: uuid(),
    title: "Create new apps",
    text: "Create a new portfolio app",
    priority: "3",
    date: "30.10.2022"
  },
  {
    id: uuid(),
    title: "Learn English",
    text: "Do some exercises",
    priority: "2",
    date: "28.10.2022"
  },
  {
    id: uuid(),
    title: "Code review",
    text: "",
    priority: "1",
    date: "29.10.2022"
  },
  {
    id: uuid(),
    title: "Reply to messages",
    text: "Reply to messages in Telegram",
    priority: "3",
    date: "28.10.2022"
  }
];

const cols = {
  [uuid()]: {
    name: "Requested",
    items: notes
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const App = () => {
  const [columns, setColumns] = useState(cols);

  return (
    <div className="app">
      <h1 className="app_title">To-Do-List</h1>
      <div>
        <div>
          <AddNewNote columns={columns} setColumns={setColumns} />
          <Notes columns={columns} setColumns={setColumns} />
        </div>

        <Forecast />
      </div>
    </div>
  );
};

export default App;
