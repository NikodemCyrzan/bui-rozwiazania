"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { filmReducer, initialFilmState } from "@/reducers/filmReducer";

const FilmStateContext = createContext(null);
const FilmDispatchContext = createContext(null);

export function FilmProvider({ children }) {
	const [state, dispatch] = useReducer(filmReducer, initialFilmState);

	useEffect(() => {
		let cancelled = false;

		dispatch({ type: "FETCH_START" });

		fetch("/api/filmy")
			.then((res) => {
				if (!res.ok) throw new Error(`Server error: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				if (!cancelled) dispatch({ type: "FETCH_SUCCESS", payload: data });
			})
			.catch((err) => {
				if (!cancelled) dispatch({ type: "FETCH_ERROR", payload: err.message });
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<FilmStateContext.Provider value={state}>
			<FilmDispatchContext.Provider value={dispatch}>{children}</FilmDispatchContext.Provider>
		</FilmStateContext.Provider>
	);
}

export function useFilmState() {
	const context = useContext(FilmStateContext);
	if (context === null) {
		throw new Error("useFilmState must be used within a FilmProvider");
	}
	return context;
}

export function useFilmDispatch() {
	const context = useContext(FilmDispatchContext);
	if (context === null) {
		throw new Error("useFilmDispatch must be used within a FilmProvider");
	}
	return context;
}
