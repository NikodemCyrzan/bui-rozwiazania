"use client";

import { useFilmState, useFilmDispatch } from "@/context/FilmContext";

export default function FavoriteButton({ filmId, title, compact = false }) {
	const { favorites } = useFilmState();
	const dispatch = useFilmDispatch();

	const isFavorite = favorites.includes(filmId);

	const handleClick = () => {
		dispatch({ type: "TOGGLE_FAVORITE", payload: filmId });
		dispatch({
			type: "ADD_NOTIFICATION",
			payload: {
				type: isFavorite ? "info" : "success",
				message: isFavorite
					? `Usunięto „${title}” z ulubionych`
					: `Dodano „${title}” do ulubionych`,
			},
		});
	};

	if (compact) {
		return (
			<button
				className={isFavorite ? "fav-star fav-star--active" : "fav-star"}
				onClick={handleClick}
				aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}>
				{isFavorite ? "★" : "☆"}
			</button>
		);
	}

	return (
		<button
			className={isFavorite ? "btn btn--fav-active" : "btn btn--primary"}
			onClick={handleClick}>
			{isFavorite ? "★ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
		</button>
	);
}
