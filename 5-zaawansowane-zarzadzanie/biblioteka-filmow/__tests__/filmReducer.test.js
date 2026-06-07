import { describe, it, expect } from "@jest/globals";
import { filmReducer, initialFilmState } from "@/reducers/filmReducer";

describe("filmReducer", () => {
	it("FETCH_START sets loading=true and clears error", () => {
		const state = { ...initialFilmState, error: "stary błąd" };
		const next = filmReducer(state, { type: "FETCH_START" });

		expect(next.loading).toBe(true);
		expect(next.error).toBeNull();
	});

	it("FETCH_SUCCESS stores films and turns off loading", () => {
		const films = [{ id: 1, title: "Oppenheimer", year: 2023, genre: "Dramat" }];
		const state = { ...initialFilmState, loading: true };
		const next = filmReducer(state, { type: "FETCH_SUCCESS", payload: films });

		expect(next.films).toEqual(films);
		expect(next.loading).toBe(false);
	});

	it("FETCH_ERROR stores the error and turns off loading", () => {
		const state = { ...initialFilmState, loading: true };
		const next = filmReducer(state, {
			type: "FETCH_ERROR",
			payload: "Brak połączenia",
		});

		expect(next.error).toBe("Brak połączenia");
		expect(next.loading).toBe(false);
	});

	it("SET_QUERY updates the search query", () => {
		const next = filmReducer(initialFilmState, {
			type: "SET_QUERY",
			payload: "dune",
		});

		expect(next.query).toBe("dune");
	});

	it("TOGGLE_FAVORITE adds an ID when it is not present", () => {
		const next = filmReducer(initialFilmState, {
			type: "TOGGLE_FAVORITE",
			payload: 2,
		});

		expect(next.favorites).toContain(2);
		expect(next.favorites).toHaveLength(1);
	});

	it("TOGGLE_FAVORITE removes an ID when it already exists", () => {
		const state = { ...initialFilmState, favorites: [2, 5] };
		const next = filmReducer(state, { type: "TOGGLE_FAVORITE", payload: 2 });

		expect(next.favorites).not.toContain(2);
		expect(next.favorites).toEqual([5]);
	});

	it("ADD_FILM appends a film to the list", () => {
		const state = {
			...initialFilmState,
			films: [{ id: 1, title: "Oppenheimer", year: 2023, genre: "Dramat" }],
		};
		const newFilm = { id: 2, title: "Inception", year: 2010, genre: "Sci-Fi" };
		const next = filmReducer(state, { type: "ADD_FILM", payload: newFilm });

		expect(next.films).toHaveLength(2);
		expect(next.films[1]).toEqual(newFilm);
	});

	it("ADD_NOTIFICATION adds a notification with id, message and type", () => {
		const next = filmReducer(initialFilmState, {
			type: "ADD_NOTIFICATION",
			payload: { message: "Zapisano", type: "success" },
		});

		expect(next.notifications).toHaveLength(1);
		expect(next.notifications[0]).toMatchObject({
			message: "Zapisano",
			type: "success",
		});
		expect(typeof next.notifications[0].id).toBe("number");
	});

	it("DISMISS_NOTIFICATION removes a notification by ID", () => {
		const state = {
			...initialFilmState,
			notifications: [
				{ id: 111, message: "A", type: "info" },
				{ id: 222, message: "B", type: "error" },
			],
		};
		const next = filmReducer(state, {
			type: "DISMISS_NOTIFICATION",
			payload: 111,
		});

		expect(next.notifications).toHaveLength(1);
		expect(next.notifications[0].id).toBe(222);
	});

	it("does not mutate the input state (immutability)", () => {
		const state = Object.freeze({
			...initialFilmState,
			favorites: Object.freeze([1]),
		});

		expect(() => filmReducer(state, { type: "TOGGLE_FAVORITE", payload: 2 })).not.toThrow();

		const next = filmReducer(state, { type: "TOGGLE_FAVORITE", payload: 2 });
		expect(next).not.toBe(state);
		expect(state.favorites).toEqual([1]);
	});

	it("unknown action throws an Error (fail fast)", () => {
		expect(() => filmReducer(initialFilmState, { type: "UNKNOWN_ACTION" })).toThrow();
	});
});
