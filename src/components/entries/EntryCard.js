import React from "react";

export default function EntryCard(props) {
  const entry = props.entry;
  return (
    <li key={entry._id} className="pageItem newEntry entryCard">
      <h1 className="cardTitle">{entry.title}</h1>
      <hr />
      <p className="cardContent">{entry.content}</p>
    </li>
  );
}
