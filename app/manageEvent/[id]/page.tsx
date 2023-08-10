'use client';

import { useState } from "react";
import { Event, Invite } from "@prisma/client";
import RouteButton from "@/components/RouteButton";
import useLoadData from "@/hooks/useLoadData";
import { useRouter } from "next/navigation";

export default function ManageEvent({ params }: { params: { id: string } }) {
	const [event, setEvent] = useState<Event>();
	const router = useRouter();
	useLoadData((data) => { setEvent(data.event) }, `/api/event?id=${params.id}`);

	return (
		<div className="w-full flex h-full ">
			<div className="w-max m-auto bg-gray-50 rounded-lg ring-1 ring-gray-300 p-4 ">
				<h1 className="text-lg font-semibold mb-4">{ event?.title }</h1>
				<p>location: { event?.location }</p>
				<p>access from { String(event?.accessStart) } to { String(event?.accessEnd) }</p>
				<p>
					invite link:
					<button onClick={() => { router.push(event?.inviteLink) }}>{ event?.inviteLink }</button>
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