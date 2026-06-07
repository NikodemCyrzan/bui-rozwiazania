import Link from "next/link";

export default function Home() {
	return (
		<section className="hero">
			<h1>🎬 Biblioteka Filmów</h1>
			<p className="hero-text">
				Przeglądaj kolekcję filmów, wyszukuj tytuły, dodawaj nowe pozycje i oznaczaj
				ulubione. Aplikacja zbudowana w Next.js App Router.
			</p>
			<Link href="/filmy" className="btn btn--primary">
				Przejdź do listy filmów -&gt;
			</Link>
		</section>
	);
}
