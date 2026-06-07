import nextJest from "next/jest.js";

// next/jest konfiguruje transformacje SWC (ESM, JSX) oraz alias @/ z jsconfig.
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
	testEnvironment: "node",
};

export default createJestConfig(config);
