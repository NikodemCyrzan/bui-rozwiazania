"use client";

import { useState } from "react";

export default function FavoriteButton() {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<button
			className={isFavorite ? "btn btn--fav-active" : "btn btn--primary"}
			onClick={() => setIsFavorite((prev) => !prev)}>
			{isFavorite ? "★ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
		</button>
	);
}
