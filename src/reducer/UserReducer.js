const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
