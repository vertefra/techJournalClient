import React, { useContext, useState, useEffect } from "react";
import { server, dateFormat } from "../../setting";
import { UserContext } from "../../context/ContextStore";

export default function EntryCard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [mode, updateMode] = useState({
    editMode: false,
  });
  const [entries, updateEntries] = props.controllers;
  const entry = props.entry;

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
    console.log(e.target.name);
    const mode = e.target.name === "edit" ? true : false;
    updateMode({ ...mode, editMode: mode });
  };

  return (
    <li key={entry._id} className="entryCard">
      <h1 className="cardTitle">{entry.title}</h1>
      <hr />
      <textarea
        className={`cardContent ${mode.editMode ? "editField" : "readOnly"}`}
        value={entry.content}
        readOnly={!mode.editMode}
      />
      <footer>
        <button id={entry._id} onClick={handleDelete} className="darkImg">
          X
        </button>
        <h2>{entry.createdAt}</h2>
        {!mode.editMode ? (
          <button className="darkImg">
            <img src="./icons/edit.svg" name="edit" onClick={toggleEdit} />
          </button>
        ) : (
          <button className="darkImg">
            <img src="./icons/save.svg" name="save" onClick={toggleEdit} />
          </button>
        )}
      </footer>
    </li>
  );
}
