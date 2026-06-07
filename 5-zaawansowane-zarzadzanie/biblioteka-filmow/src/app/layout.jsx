import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { FilmProvider } from "@/context/FilmContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import Nav from "@/components/Nav";
import Notifications from "@/components/Notifications";

export const metadata = {
	title: "Biblioteka Filmów",
	description: "Zaawansowane zarządzanie stanem - useReducer + Context API",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pl">
			<body>
				{/* ThemeProvider opakowuje FilmProvider (motyw nadrzedny) */}
				<ThemeProvider>
					<FilmProvider>
						<ThemeWrapper>
							<Nav />
							<Notifications />
							<main className="container">{children}</main>
						</ThemeWrapper>
					</FilmProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
