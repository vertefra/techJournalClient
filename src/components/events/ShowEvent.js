import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
let endpoint = '/events';

function Show(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    const [event, updateEvent] = useState({});
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const reposnse = await axios
    //         }
    //     })
    // })
}





export default ShowEvent;