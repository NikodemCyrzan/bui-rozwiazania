const FILMS = [
	{ id: 1, title: "Oppenheimer", year: 2023, genre: "Dramat", rating: 5, watched: true },
	{ id: 2, title: "Dune: Część druga", year: 2024, genre: "Sci-Fi", rating: 4, watched: false },
	{ id: 3, title: "Past Lives", year: 2023, genre: "Romans", rating: 5, watched: true },
	{ id: 4, title: "Poor Things", year: 2023, genre: "Komedia", rating: 4, watched: false },
];

const GENRE_COLORS = {
	Dramat: "#8b5cf6",
	"Sci-Fi": "#3b82f6",
	Romans: "#ec4899",
	Komedia: "#f59e0b",
};

const FALLBACK_COLOR = "#6b7280";

function RatingStars({ rating = 3 }) {
	const filled = "★".repeat(rating);
	const empty = "☆".repeat(5 - rating);

	return (
		<span className="film-rating">
			<span className="star-filled">{filled}</span>
			<span className="star-empty">{empty}</span>
		</span>
	);
}

function GenreBadge({ genre }) {
	const bg = GENRE_COLORS[genre] ?? FALLBACK_COLOR;

	return (
		<span className="film-genre" style={{ backgroundColor: bg }}>
			{genre}
		</span>
	);
}

function WatchedBadge({ watched }) {
	if (!watched) return null;

	return <p className="film-watched">✓ Obejrzany</p>;
}

function FilmCard({ title, year, genre, rating, watched }) {
	return (
		<div className="film-card">
			<h3 className="film-title">
				{title}
				<span className="film-year">({year})</span>
			</h3>

			<div className="film-meta">
				<GenreBadge genre={genre} />
				<RatingStars rating={rating} />
			</div>

			<WatchedBadge watched={watched} />
		</div>
	);
}

function FilmList({ title, films }) {
	return (
		<section className="film-section">
			<h2 className="section-title">{title}</h2>
			<div className="film-grid">
				{films.map((film) => (
					<FilmCard
						key={film.id}
						title={film.title}
						year={film.year}
						genre={film.genre}
						rating={film.rating}
						watched={film.watched}
					/>
				))}
			</div>
		</section>
	);
}

function App() {
	const watched = FILMS.filter((film) => film.watched);
	const unwatched = FILMS.filter((film) => !film.watched);

	return (
		<div className="app">
			<h1 className="app-header">🎬 Biblioteka Filmów</h1>
			<FilmList title="Obejrzane" films={watched} />
			<FilmList title="Do obejrzenia" films={unwatched} />
		</div>
	);
}

export default App;
