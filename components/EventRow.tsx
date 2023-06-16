'use client';

import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function EventRow({ event }: { event: Event }) {
	const router = useRouter();

	function handleClick() {
		router.push(`/manageEvent/${event.id}`);
	}

	return (
		<tr className="cursor-pointer" onClick={handleClick} key={event.id}>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.title}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.location}</td>
		</tr>
	);
}