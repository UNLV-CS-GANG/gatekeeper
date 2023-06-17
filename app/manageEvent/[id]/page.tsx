'use client';

import { useState, useEffect } from "react";
import { Event } from "@prisma/client";
import RouteButton from "@/components/RouteButton";

export default function ManageEvent({ params }: { params: { id: string } }) {
	const [event, setEvent] = useState<Event>();
	
	useEffect(() => {
		const getEvent = async () => {
			const id = params.id;
			const res = await fetch(`/api/event?id=${id}`, { method: 'GET' });
			const { event } = await res.json();
			setEvent(event);
		}
		getEvent();
	}, []);

	return (
		<div>
			<p>temp page layout for now...</p>
			<p>id: { event?.id }</p>
			<p>title: { event?.title }</p>
			<p>location: { event?.location }</p>
			<p>access from { String(event?.accessStart) } to { String(event?.accessEnd) }</p>

			<RouteButton route='/'>Back</RouteButton>
		</div>
	)
}