import { NextResponse } from "next/server";
import { z } from "zod";

export let films = [
	{ id: 1, title: "Oppenheimer", year: 2023, genre: "Dramat" },
	{ id: 2, title: "Dune: Część druga", year: 2024, genre: "Sci-Fi" },
	{ id: 3, title: "Past Lives", year: 2023, genre: "Romans" },
	{ id: 4, title: "Poor Things", year: 2023, genre: "Komedia" },
];

const filmSchema = z.object({
	title: z.string().min(2, "Tytuł musi mieć co najmniej 2 znaki"),
	year: z
		.number()
		.int("Rok musi być liczbą całkowitą")
		.min(1888, "Rok nie może być wcześniejszy niż 1888")
		.max(2030, "Rok nie może być późniejszy niż 2030"),
	genre: z.string().min(1, "Gatunek jest wymagany"),
});

export async function GET() {
	return NextResponse.json(films);
}

export async function POST(request) {
	let body;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ message: "Nieprawidłowy format JSON" }, { status: 400 });
	}

	const result = filmSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				message: "Błędne dane",
				errors: result.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}

	const nextId = films.reduce((max, f) => Math.max(max, f.id), 0) + 1;
	const newFilm = { id: nextId, ...result.data };
	films.push(newFilm);

	return NextResponse.json(newFilm, { status: 201 });
}
