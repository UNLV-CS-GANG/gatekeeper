'use client';

import { useState } from "react";
import { Event } from "@prisma/client";
import RouteButton from "@/components/RouteButton";
import useLoadEvent from "@/hooks/useLoadEvent";

export default function ManageEvent({ params }: { params: { id: string } }) {
	const [event, setEvent] = useState<Event>();
	useLoadEvent((data) => { setEvent(data.event) }, params.id);

	return (
		<div>
			<p>temp page layout for now...</p>
			<p>id: { event?.id }</p>
			<p>title: { event?.title }</p>
			<p>location: { event?.location }</p>
			<p>access from { String(event?.accessStart) } to { String(event?.accessEnd) }</p>
			<p>invite link: { event?.inviteLink }</p>

			<RouteButton route='/'>Back</RouteButton>
		</div>
	)
}