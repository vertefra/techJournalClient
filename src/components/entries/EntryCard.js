import React, { useContext, useState, useEffect } from "react";
import { server, dateFormat } from "../../setting";
import { UserContext } from "../../context/ContextStore";
import SkillsWidget from "../skillWidget/SkillsWidget";

export default function EntryCard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [mode, updateMode] = useState({
    editMode: false,
  });
  const [entries, updateEntries] = props.controllers;
  const [entry, updateEntry] = useState({ ...props.entry });

  const handleDelete = (e) => {
    (async () => {
      try {
        const response = await fetch(
          `${server}/users/${userState.id}/entries/${e.target.id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);
        updateEntries({
          ...entries,
          loaded: false,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const toggleEdit = (e) => {
    console.log("ID", e.target.id);
    if (e.target.name === "edit") {
      updateMode({ ...mode, editMode: true });
    } else {
      (async () => {
        try {
          const response = await fetch(
            `${server}/users/${userState.id}/entries/${e.target.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(entry),
            }
          );
          const data = await response.json();
          console.log(data);
          updateMode({ ...mode, editMode: false });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleChange = (e) => {
    updateEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <li key={entry._id} className="entryCard">
      <input
        className="cardTitle"
        name="title"
        value={entry.title}
        readOnly={!mode.editMode}
        onChange={handleChange}
      />
      <hr />
      <div className="hor">
        <textarea
          className={`cardContent ${mode.editMode ? "editField" : "readOnly"}`}
          name="content"
          value={entry.content}
          readOnly={!mode.editMode}
          onChange={handleChange}
        />
        <SkillsWidget />
      </div>
      <footer>
        <button id={entry._id} onClick={handleDelete} className="darkImg">
          X
        </button>
        <h2>{entry.createdAt}</h2>
        {!mode.editMode ? (
          <button className="darkImg">
            <img
              src="./icons/edit.svg"
              name="edit"
              onClick={toggleEdit}
              id={entry._id}
            />
          </button>
        ) : (
          <button className="darkImg" id={entry._id}>
            <img
              src="./icons/save.svg"
              name="save"
              onClick={toggleEdit}
              id={entry._id}
            />
          </button>
        )}
      </footer>
    </li>
  );
}
