export const initialFilmState = {
	films: [],
	loading: true,
	error: null,
	query: "",
	favorites: [],
	notifications: [],
};

export function filmReducer(state, action) {
	switch (action.type) {
		case "FETCH_START":
			return { ...state, loading: true, error: null };

		case "FETCH_SUCCESS":
			return { ...state, films: action.payload, loading: false };

		case "FETCH_ERROR":
			return { ...state, error: action.payload, loading: false };

		case "SET_QUERY":
			return { ...state, query: action.payload };

		case "TOGGLE_FAVORITE": {
			const id = action.payload;
			const isFavorite = state.favorites.includes(id);

			return {
				...state,
				favorites: isFavorite
					? state.favorites.filter((favId) => favId !== id)
					: [...state.favorites, id],
			};
		}

		case "ADD_FILM":
			return { ...state, films: [...state.films, action.payload] };

		case "ADD_NOTIFICATION":
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						id: Date.now(),
						message: action.payload.message,
						type: action.payload.type,
					},
				],
			};

		case "DISMISS_NOTIFICATION":
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification.id !== action.payload,
				),
			};

		default:
			throw new Error(`Unknown reducer action: ${action.type}`);
	}
}
