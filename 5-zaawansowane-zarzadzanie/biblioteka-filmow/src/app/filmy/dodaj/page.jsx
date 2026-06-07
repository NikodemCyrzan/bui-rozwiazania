"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useFilmDispatch } from "@/context/FilmContext";

const validationSchema = Yup.object({
	title: Yup.string()
		.min(2, "Tytuł musi mieć co najmniej 2 znaki")
		.required("Tytuł jest wymagany"),
	year: Yup.number()
		.typeError("Rok musi być liczbą")
		.integer("Rok musi być liczbą całkowitą")
		.min(1888, "Rok nie może być wcześniejszy niż 1888")
		.max(2030, "Rok nie może być późniejszy niż 2030")
		.required("Rok jest wymagany"),
	genre: Yup.string().required("Gatunek jest wymagany"),
});

export default function DodajFilmPage() {
	const router = useRouter();
	const dispatch = useFilmDispatch();

	return (
		<section>
			<h1>Dodaj nowy film</h1>
			<Formik
				initialValues={{ title: "", year: "", genre: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const res = await fetch("/api/filmy", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								title: values.title,
								year: Number(values.year),
								genre: values.genre,
							}),
						});

						if (!res.ok) {
							const data = await res.json().catch(() => ({}));
							dispatch({
								type: "ADD_NOTIFICATION",
								payload: {
									type: "error",
									message: data.message ?? "Nie udało się zapisać filmu",
								},
							});
							return;
						}

						const newFilm = await res.json();

						dispatch({ type: "ADD_FILM", payload: newFilm });
						dispatch({
							type: "ADD_NOTIFICATION",
							payload: {
								type: "success",
								message: `Dodano film „${newFilm.title}”`,
							},
						});

						router.push("/filmy");
					} catch {
						dispatch({
							type: "ADD_NOTIFICATION",
							payload: { type: "error", message: "Błąd połączenia z serwerem" },
						});
					} finally {
						setSubmitting(false);
					}
				}}>
				{({ touched, errors, isSubmitting }) => (
					<Form className="film-form" noValidate>
						<div className="form-field">
							<label htmlFor="title">Tytuł</label>
							<Field id="title" name="title" type="text" />
							{touched.title && errors.title && (
								<span className="form-error">{errors.title}</span>
							)}
						</div>
						<div className="form-field">
							<label htmlFor="year">Rok</label>
							<Field id="year" name="year" type="number" />
							{touched.year && errors.year && (
								<span className="form-error">{errors.year}</span>
							)}
						</div>
						<div className="form-field">
							<label htmlFor="genre">Gatunek</label>
							<Field id="genre" name="genre" type="text" />
							{touched.genre && errors.genre && (
								<span className="form-error">{errors.genre}</span>
							)}
						</div>
						<button type="submit" className="btn btn--primary" disabled={isSubmitting}>
							{isSubmitting ? "Zapisywanie..." : "Zapisz film"}
						</button>
					</Form>
				)}
			</Formik>
		</section>
	);
}
