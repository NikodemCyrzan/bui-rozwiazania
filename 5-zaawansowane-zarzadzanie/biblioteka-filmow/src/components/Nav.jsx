"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFilmState } from "@/context/FilmContext";
import { useTheme } from "@/context/ThemeContext";

const LINKS = [
	{ href: "/", label: "Start" },
	{ href: "/filmy", label: "Filmy" },
];

export default function Nav() {
	const pathname = usePathname();
	const { favorites } = useFilmState();
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="nav">
			<span className="nav-brand">🎬 Biblioteka Filmów</span>

			<div className="nav-links">
				{LINKS.map((link) => {
					const isActive =
						link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

					return (
						<Link
							key={link.href}
							href={link.href}
							className={isActive ? "nav-link nav-link--active" : "nav-link"}>
							{link.label}
						</Link>
					);
				})}

				<span className="nav-fav-count" title="Ulubione filmy">
					★ {favorites.length}
				</span>

				<button
					className="btn nav-theme-toggle"
					onClick={toggleTheme}
					aria-label="Przełącz motyw">
					{theme === "dark" ? "Jasny" : "Ciemny"}
				</button>
			</div>
		</nav>
	);
}
