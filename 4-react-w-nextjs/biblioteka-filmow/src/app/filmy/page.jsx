"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";

export default function FilmyPage() {
	const [refreshKey, setRefreshKey] = useState(0);
	const [query, setQuery] = useState("");
	const searchRef = useRef(null);

	const { data, loading, error } = useFetch("/api/filmy?v=" + refreshKey);

	useEffect(() => {
		searchRef.current?.focus();
	}, []);

	const films = data ?? [];
	const filtered = films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase()));

	return (
		<section>
			<div className="page-header">
				<h1>Filmy</h1>
				<div className="page-header-actions">
					<button className="btn" onClick={() => setRefreshKey((prev) => prev + 1)}>
						Odśwież
					</button>
					<Link href="/filmy/dodaj" className="btn btn--primary">
						+ Dodaj film
					</Link>
				</div>
			</div>
			<input
				ref={searchRef}
				type="text"
				className="search-input"
				placeholder="Szukaj po tytule..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{loading && <p className="state-info">Ładowanie filmów...</p>}
			{error && <p className="state-error">Wystąpił błąd: {error}</p>}
			{!loading && !error && (
				<>
					{filtered.length === 0 ? (
						<p className="state-info">Brak filmów pasujących do wyszukiwania.</p>
					) : (
						<ul className="film-grid">
							{filtered.map((film) => (
								<li key={film.id} className="film-card">
									<Link href={`/filmy/${film.id}`} className="film-card-link">
										<h3 className="film-title">
											{film.title}
											<span className="film-year"> ({film.year})</span>
										</h3>
										<span className="film-genre">{film.genre}</span>
									</Link>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</section>
	);
}
