import { createContext, useReducer, useContext } from "react";
const loaderContext = createContext();
const loaderContextDispatcher = createContext();

const initialState = { shown: false }

const reducer = (state, action) => {
    switch (action.type) {
        case "hide":
            return {...state, shown: false}
        case "show":
            return {state, shown: true}
        default:
            return state
    }
}

function LoaderProvider({ children }) {
    const [loaderState, dispatch] = useReducer(reducer, initialState);

    return (
        <loaderContext.Provider value={loaderState}>
            <loaderContextDispatcher.Provider value={dispatch}>
                {children}
            </loaderContextDispatcher.Provider>
        </loaderContext.Provider>
    );
}

export default LoaderProvider;

export const useLoader = () => useContext(loaderContext);
export const useLoaderDispatcher = () => useContext(loaderContextDispatcher);
