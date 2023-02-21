import { createContext, useReducer, useContext } from "react";
const userContext = createContext();
const userContextDispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
  }
};

function UserProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, { loggedIn: false });

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
