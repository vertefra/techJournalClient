import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";
import Layout from "../layout/Layout";
import "./dashboard.css";
import axios from "axios";
import { server } from "../../setting";
import ShowLocationsEvent from "../locationSearch/ShowLocationsEvent";
import { sortByDate } from "../utils";

function Dashboard(props) {
  const [userState, dispatchUserState] = useContext(UserContext);
  const [entries, updateEntries] = useState([]);
  const [skills, updateSkills] = useState([]);
  useEffect(() => {
    {
      if (userState.loggedIn) {
        (async () => {
          try {
            const response = await fetch(
              `${server}/users/${userState.id}/entries`
            );
            const data = await response.json();
            updateEntries([...entries, ...data.entries]);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn]);
  useEffect(() => {
    {
      if (userState.loggedIn) {
        (async () => {
          try {
            const response = await fetch(
              `${server}/users/${userState.id}/skills`
            );
            const data = await response.json();
            console.log(data[0]);
            updateSkills([...data]);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [userState.loggedIn]);
  return (
    <Layout>
      <div className="dashboardBody">
        <div className="dbUserInfo">
          <div className="dbUserCover">
            <h1>{userState.name}</h1>
            <hr />
            <h2>{userState.email}</h2>
            <div className="dbSkillBox">
              {skills.map((skill, i) => {
                return (
                  <h3
                    className="dbSkill"
                    key={i}
                    style={{
                      backgroundColor: `rgb(${255 - (i % 2) * 50}, ${
                        190 - (i % 7) * 20
                      }, ${220 + (i % 2) * 30})`,
                    }}
                  >
                    {" "}
                    {skill.skill}
                  </h3>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dbEntries">
          <h1 className="dbEntryItem dbHeader">Recent Entries</h1>
          {sortByDate(entries).map((entry) => {
            return (
              <div key={entry._id}>
                <div className="dbEntryItem">
                  <div className="dbEntryTitleTime">
                    <h2>{entry.title}</h2>
                    <h2>{new Date(entry.createdAt).toDateString()}</h2>
                  </div>
                  <hr />
                  <p>{entry.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="dbEvents">
          <h1 className="dbHeader">Events</h1>
          <div className="mapHolder">
            <ShowLocationsEvent />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
