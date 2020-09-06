import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/ContextStore";

function Entries(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    return (
        <div>
            <h1>App</h1>
        </div>
    );
}

export default Entries;