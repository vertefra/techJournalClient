const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
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
        journalEntries: [...action.payload],
      };

    default:
      return state;
  }
};

export default UserReducer;
