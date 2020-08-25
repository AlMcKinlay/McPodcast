import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
	logs: [],
};

function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case "ADD_LOG":
			return { ...state, logs: [...state.logs, { content: action.log, timestamp: Date.now() }] };
		default:
			return state;
	}
}

const DispatchContext = createContext(null);
const StoreContext = createContext(null);

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, defaultState);

	return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
