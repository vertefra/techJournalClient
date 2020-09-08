import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import AddEntryForm from "./AddEntryForm";
import EntryCard from "./EntryCard";
import { server } from "../../setting";
function Entries(props) {
  const [userState, dispatchUserState] = useContext(UserContext);

  useEffect(() => {
    {
      (async () => {
        try {
          const response = await fetch(
            `${server}/users/${userState.id}/entries`
          );
          const data = await response.json();
          console.log(data);
          dispatchUserState({
            type: "LOAD_ENTRIES",
            payload: data.entries,
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <Layout>
      <AddEntryForm />
      <ul>
        {userState.journalEntries.length > 0 &&
          userState.journalEntries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />;
          })}
      </ul>
    </Layout>
  );
}

export default Entries;
