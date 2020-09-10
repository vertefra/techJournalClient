import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextStore";
import { server } from "../../setting";
import { sortByDate } from "../utils";
import AddEntryForm from "./AddEntryForm";
import Layout from "../layout/Layout";
import EntryCard from "./EntryCard";

function Entries(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [entries, updateEntries] = useState({
    loaded: false,
    entriesArray: [],
  });

  useEffect(() => {
    {
      if (userState.loggedIn && entries.loaded === false) {
        (async () => {
          try {
            const response = await fetch(
              `${server}/users/${userState.id}/entries`
            );
            const data = await response.json();
            updateEntries({
              ...entries,
              entriesArray: [...data.entries],
              loaded: true,
            });
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn, entries]);

  // useEffect(() => {
  //   console.log("rerender", entries.entriesArray);
  // }, [entries]);

  return (
    <Layout>
      <div className="entriesWrapper">
        <AddEntryForm controllers={[entries, updateEntries]} />
        <ul>
          {sortByDate(entries.entriesArray).map((entry) => {
            return (
              <EntryCard
                key={entry._id}
                entry={entry}
                controllers={[entries, updateEntries]}
              />
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default Entries;
