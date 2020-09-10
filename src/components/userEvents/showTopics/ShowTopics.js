import React from "react";

export default function ShowTopics(props) {
  const [topics, setTopics] = props.controller;
  console.log(topics);
  const handleDeleteTopic = (e) => {
    console.log(e.target.id);
    const newTopics = topics.filter((topic) => topic.id !== e.target.id);
    setTopics([...newTopics]);
  };
  return (
    <div className="widgetContainer skillsBoard">
      <h2 className="widgetTitle">topics of the event: </h2>
      {topics.map((skill) => {
        return (
          <div className="skill-tag" key={skill.id}>
            {skill.skill}
            <button
              className="deleteTag"
              id={skill.id}
              onClick={handleDeleteTopic}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
}
