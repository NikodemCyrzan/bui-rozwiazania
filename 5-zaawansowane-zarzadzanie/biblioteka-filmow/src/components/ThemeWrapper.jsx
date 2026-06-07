"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeWrapper({ children }) {
	const { theme } = useTheme();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<div className="theme-root" data-theme={theme}>
			{children}
		</div>
	);
}
