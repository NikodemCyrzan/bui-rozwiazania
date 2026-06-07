import Link from "next/link";

export default function NotFound() {
	return (
		<section className="not-found">
			<h1>404 — Nie znaleziono filmu</h1>
			<p>Film o podanym identyfikatorze nie istnieje w bibliotece.</p>
			<Link href="/filmy" className="btn btn--primary">
				&lt;- Powrót do listy filmów
			</Link>
		</section>
	);
}
