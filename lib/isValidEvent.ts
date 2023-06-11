import { Event } from "@prisma/client";

export default function isValidEvent(event: Event): boolean {
	if(!event.title || !event.location || !event.accessStart || !event.accessEnd)
		return false;
	return true;
}