// ====== userState ====== //
//
// this is a global state 
// distributed to all the 
// components thanks to 
// context Provide and 
// retrieved from the 
// component with the hooks
// useContext.  

const userState = {
    id: '',
    name: '',
    isLogged: '',
    entries: [],
    myEntries: [],
    myEvents: [],
}

export default userState
  