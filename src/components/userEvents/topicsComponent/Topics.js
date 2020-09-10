import React, { useState, useEffect } from "react";
import { server } from "../../../setting";

export default function Topics(props) {
  const [topics, setTopics] = props.controller;
  const [topicsInDatabase, setTopicsInDatabase] = useState([]);
  const [topic, updateTopic] = useState({
    showSuggestions: false,
    suggestionsList: [],
    filteredList: [],
    searchedTopic: "",
  });

  const handleChange = (e) => {
    // checking for every item in the suggestion list if an element match with what the user
    // is writing in the input

    const filteredList = topic.suggestionsList.filter((topic) => {
      return topic.skill.includes(e.target.value);
    });

    updateTopic({
      ...topic,
      showSuggestions: true,
      searchedTopic: e.target.value,
      filteredList,
    });
  };

  const handleAddTopic = (e) => {
    const skillName = e.target.dataset.skillname;
    const skillId = e.target.id;
    console.log(skillName, skillId);
    setTopics([
      ...topics,
      {
        skill: skillName,
        id: skillId,
      },
    ]);
    updateTopic({
      ...topic,
      searchedTopic: "",
      showSuggestions: false,
    });
  };

  useEffect(() => {
    if (topicsInDatabase.length === 0) {
      (async () => {
        try {
          const response = await fetch(`${server}/skills`);
          const data = await response.json();
          updateTopic({ ...topic, suggestionsList: [...data] });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [topicsInDatabase]);

  //   useEffect(() => {
  //     console.log(topic);
  //   }, [topic.suggestionsList]);

  return (
    <div>
      <input
        className="FormInput"
        value={topic.searchedTopic}
        onChange={handleChange}
      ></input>
      {topic.showSuggestions && (
        <ul>
          {topic.filteredList.map((skill, idx) => {
            return (
              <li
                key={idx}
                className="suggestions"
                data-skillname={skill.skill}
                id={skill._id}
                onClick={handleAddTopic}
              >
                {skill.skill}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
