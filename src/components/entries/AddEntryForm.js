import React, { useState, useContext, useEffect } from "react";
import "./addEntry.css";
import axios from "axios";
import { server } from "../../setting";
import { UserContext } from "../../context/ContextStore";

export default function AddEntryForm(props) {
  const [userState] = useContext(UserContext);
  const [entry, updateEntry] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    updateEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("submitting?");
    e.preventDefault();
    (async () => {
      try {
        const response = axios.post(`${server}/users/${userState.id}/entries`, {
          ...entry,
        });
        const data = await response;
        console.log(data);
        updateEntry({ ...entry, ...{ title: "", content: "" } });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className="pageItem loginContainer newEntry">
      <h2 className="title">Add a new Entry</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            value={entry.title}
            onChange={handleChange}
          />
          <br />
        </div>
        <div>
          <label htmlFor="content">content</label>
          <br />
          <textarea
            type="text"
            name="content"
            id="content"
            value={entry.content}
            onChange={handleChange}
          />
          <br />
        </div>
        <input type="submit" value="Add a new entry" />
      </form>
    </div>
  );
}
