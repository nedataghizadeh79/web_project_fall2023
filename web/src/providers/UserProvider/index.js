import { createContext, useReducer, useContext } from "react";
import { USER_LOGIN, USER_LOGOUT } from "./action";
const userContext = createContext();
const userContextDispatcher = createContext();

const initialState = {
  loggedIn: false,
  id: null,
  username: null,
  name: null,
  email: null,
  roles: null,
  token: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, loggedIn: true, ...action.payload }
    case USER_LOGOUT:
      return { ...initialState }
    default:
      return { ...state }
  }
};

function UserProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, localStorage.getItem("user") ?
    { ...JSON.parse(localStorage.getItem("user")), loggedIn: true } :
    { ...initialState });

  return (
    <userContext.Provider value={user}>
      <userContextDispatcher.Provider value={dispatch}>
        {children}
      </userContextDispatcher.Provider>
    </userContext.Provider>
  );
}

export default UserProvider;

export const useUser = () => useContext(userContext);
export const useUserDispatcher = () => useContext(userContextDispatcher);
