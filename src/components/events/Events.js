import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextStore";

function Events(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    console.log('events is working')
    return (
        <div>
            <h1>All Events</h1>
        </div>
    );

}

export default Events;