"use client";

import { useEffect } from "react";
import { useFilmState, useFilmDispatch } from "@/context/FilmContext";

export default function Notifications() {
	const { notifications } = useFilmState();

	return (
		<div className="notifications">
			{notifications.map((notification) => (
				<NotificationItem key={notification.id} notification={notification} />
			))}
		</div>
	);
}

function NotificationItem({ notification }) {
	const dispatch = useFilmDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: "DISMISS_NOTIFICATION", payload: notification.id });
		}, 3000);

		return () => clearTimeout(timer);
	}, [notification.id, dispatch]);

	return (
		<div className={`notification notification--${notification.type}`}>
			<span>{notification.message}</span>
			<button
				className="notification-close"
				onClick={() => dispatch({ type: "DISMISS_NOTIFICATION", payload: notification.id })}
				aria-label="Zamknij powiadomienie">
				x
			</button>
		</div>
	);
}
