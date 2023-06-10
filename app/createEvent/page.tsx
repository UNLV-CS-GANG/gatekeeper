import EventForm from "@/components/EventForm";
import BackButton from "@/components/BackButton";
import isValidEvent from "@/lib/isValidEvent";
import { auth } from "@clerk/nextjs";
import { Event } from "@prisma/client";

export default async function CreateEvent() {
	'use server';
	const { userId } = auth();
	
	async function postEvent(event: Event) {
		'use server';
		const { getToken } = auth();
		const accessToken = await getToken();
		
		if(isValidEvent(event)) {
			try {
				const res = await fetch(`${process.env.BASE_URL}/api/event`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`,
					},
					body: JSON.stringify(event),
				});
	
				if(!res.ok)
					throw Error('Bad request')
	
				console.log('Successful post:', await res.json());
			}
			catch(err) {
				console.error('Error:', err);
			}
		}
		else {
			console.log('Invalid event. Canceling request...')
		}
	}

	return (
		<div>
			<EventForm postEvent={postEvent} userId={userId} />
			<BackButton route='/' />
		</div>
	);
}
