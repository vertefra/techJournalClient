import React, { useContext, useState, useEffect } from "react";
import { server } from "../../setting";
import { UserContext } from "../../context/ContextStore";

export default function EntryCard(props) {
  const entry = props.entry;
  const [userState, dispatchUserState] = useContext(UserContext);
  const handleDelete = (e) => {
    const id = e.target.id;
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
        console.log("ID before filtering ", id);
        const newEntries = userState.journalEntries.filter(
          (entry) => entry.id.toString() !== id.toString()
        );
        dispatchUserState({ type: "LOAD_ENTRIES", payload: newEntries });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <li key={entry._id} className="entryCard">
      <h1 className="cardTitle">{entry.title}</h1>
      <hr />
      <p className="cardContent">{entry.content}</p>
      <footer>
        <button id={entry._id} onClick={handleDelete}>
          delete
        </button>
        <button>edit</button>
      </footer>
    </li>
  );
}
