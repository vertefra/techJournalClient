import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import "./skillsWidget.css";
import { server } from "../../setting";
import { sortByDate } from "../utils";

export default function SkillsWidget() {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [skills, updateSkills] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(query);
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(`${server}/users/${userState.id}/skills`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skill: query }),
        });
        const data = await response.json();
        setLoaded(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(
          `${server}/users/${userState.id}/skills/${e.target.id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        setLoaded(false);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  // This load all the user skills when loaded==false.
  // Set loaded===true if load is succeessful

  useEffect(() => {
    if (loaded === false) {
      (async () => {
        try {
          const response = await fetch(
            `${server}/users/${userState.id}/skills`
          );
          const data = await response.json();
          updateSkills([...data]);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [loaded, skills]);

  // END LOAD useEffect()

  // This useEffect will look for skills that match the query.regex

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${server}/skills?regex=${query}`);
        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query]);

  return (
    <div className="widgetContainer">
      <header>
        <input className="widget" value={query} onChange={handleChange} />
        <input
          className="createSkill"
          type="submit"
          onClick={handleSubmit}
          value="add skill"
        />
      </header>
      <h1 className="widgetTitle">My skillset</h1>
      <div className="skillsBoard">
        {skills.map((skill) => {
          return (
            <div>
              <div className="skill-tag">
                {skill.skill}
                <button
                  className="deleteTag"
                  id={skill._id}
                  onClick={handleDelete}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
