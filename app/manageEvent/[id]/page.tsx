'use client';

import { useState } from "react";
import { Event, Invite } from "@prisma/client";
import RouteButton from "@/components/RouteButton";
import useLoadData from "@/hooks/useLoadData";
import { useRouter } from "next/navigation";

export default function ManageEvent({ params }: { params: { id: string } }) {
	const [event, setEvent] = useState<Event>();
	const router = useRouter();
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	} as Intl.DateTimeFormatOptions
	useLoadData((data) => { setEvent(data.event) }, `/api/event?id=${params.id}`);

	return (
		<div className="w-full flex h-full ">
			<div className="w-max m-auto bg-gray-50 rounded-lg ring-1 ring-gray-300 p-4 ">
				<h1 className="text-lg font-semibold mb-4">{ event?.title }</h1>
				<p>location: { event?.location }</p>
				<p>access from { String(new Date(event?.accessStart as Date).toLocaleDateString('en-US', options)) } to { String(new Date(event?.accessEnd as Date).toLocaleDateString('en-US', options)) }</p>
				<p>
					invite link:
					<button onClick={() => { router.push((event as Event)?.inviteLink) }}>{ (event as Event)?.inviteLink }</button>
				</p>
				
				<div className="mb-4">
					Accepted Invites:
					{ event?.invites.map((inv: Invite, index: number) => (
						<li key={index} className="list-none">{ inv.firstName } { inv.lastName }</li>
					)) }
				</div>

				<RouteButton route='/'>Back</RouteButton>
			</div>
		</div>
	)
}