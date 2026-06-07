"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	}, []);

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === null) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
