import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import FavoriteButton from "./FavoriteButton";

export default async function FilmDetailPage({ params }) {
	const { id } = await params;
	const filmId = Number(id);

	const headersList = await headers();
	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto") ?? "http";

	const res = await fetch(`${protocol}://${host}/api/filmy`, {
		cache: "no-store",
	});
	const films = await res.json();

	const film = films.find((f) => f.id === filmId);

	if (!film) {
		notFound();
	}

	return (
		<article className="film-detail">
			<Link href="/filmy" className="back-link">
				&lt;- Powrót do listy
			</Link>

			<h1>{film.title}</h1>

			<dl className="film-detail-meta">
				<div>
					<dt>Rok produkcji</dt>
					<dd>{film.year}</dd>
				</div>
				<div>
					<dt>Gatunek</dt>
					<dd>
						<span className="film-genre">{film.genre}</span>
					</dd>
				</div>
			</dl>

			<FavoriteButton filmId={film.id} title={film.title} />
		</article>
	);
}
