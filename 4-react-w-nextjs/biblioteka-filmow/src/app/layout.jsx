"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

const LINKS = [
	{ href: "/", label: "Start" },
	{ href: "/filmy", label: "Filmy" },
];

function Nav() {
	const pathname = usePathname();

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
			</div>
		</nav>
	);
}

export default function RootLayout({ children }) {
	return (
		<html lang="pl">
			<body>
				<Nav />
				<main className="container">{children}</main>
			</body>
		</html>
	);
}
