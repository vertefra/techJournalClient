import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import AddEntryForm from "./AddEntryForm";
import EntryCard from "./EntryCard";
import { server } from "../../setting";
function Entries(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [entries, updateEntries] = useState([]);

  useEffect(() => {
    {
      if (userState.loggedIn) {
        (async () => {
          try {
            const response = await fetch(
              `${server}/users/${userState.id}/entries`
            );
            const data = await response.json();
            console.log(data);
            updateEntries([...entries, ...data.entries]);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn]);

  useEffect(() => {
    console.log("rerender", entries, userState);
  }, [entries]);

  return (
    <Layout>
      <AddEntryForm />
      <ul>
        {entries.length > 0 &&
          entries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />;
          })}
      </ul>
    </Layout>
  );
}

export default Entries;
