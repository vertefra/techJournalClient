const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
      };

    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };

    case "ADD_ENTRY":
      return {
        ...state,
        journalEntries: [...state.journalEntries, action.payload],
      };

    case "LOAD_ENTRIES":
      return {
        ...state,
        journalEntries: [...state.journalEntries, ...action.payload],
      };

    case "SET_LOGGEDIN":
      return {
        ...state,
        loggedIn: action.payload,
      };

    case "SET_LOCATION":
      return {
        ...state,
        location: { ...state.location, ...action.payload },
      };

    case "LOAD_EVENTS":
      return {
        ...state,
        createdEvents: [...state.createdEvents, ...action.payload],
      };

    default:
      return state;
  }
};

export default UserReducer;
