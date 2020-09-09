import React, { useContext, useState, useEffect } from "react";
import { server } from "../../setting";
import { UserContext } from "../../context/ContextStore";

export default function EntryCard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
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
