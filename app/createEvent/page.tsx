'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Event } from "@prisma/client";


export default function CreateEvent() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [accessStart, setAccessStart] = useState(Date());
	const [accessEnd, setAccessEnd] = useState(Date()); 

	function isValidEvent(event: Event): boolean {
		if(!event.title || !event.location || !event.accessStart || !event.accessEnd)
			return false;
		return true;
	}

	// post to db
	async function postEvent(ev: React.FormEvent) {
		ev.preventDefault();

		const temp_inviteLink = 'www.templink.com/until/we/can/gen/ourselves';
		const temp_verifierCode = 'abc123';

		const event: Event = {
			title,
			location,
			accessStart: new Date(accessStart),
			accessEnd: new Date(accessEnd),
			inviteLink: temp_inviteLink,
			verifierCode: temp_verifierCode,
		}

		if(isValidEvent(event)) {
			try {
				const res = await fetch('../api/event', {
					method: 'POST',
					body: JSON.stringify(event),
				});

				if(!res.ok)
					throw Error('Bad request')
	
				console.log('Successful post:', res.json());
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
			<form onSubmit={postEvent}>
				<div>
					<label htmlFor="title">Title:</label>
					<input className="text-black" type="text" id="title" value={title} onChange={(ev) => { setTitle(ev.target.value) }} />
				</div>

				<div>
					<label htmlFor="loc">Location:</label>
					<input className="text-black" type="text" id="loc" value={location} onChange={(ev) => { setLocation(ev.target.value) }} />
				</div>

				<div>
					<p>Invite access:</p>
					<div>
						<label htmlFor="start">Access Start:</label>
						<input className="text-black" type="datetime-local" id="start" value={accessStart} onChange={(ev) => { setAccessStart(ev.target.value) }} />
						<label htmlFor="end">Access Expires:</label>
						<input className="text-black" type="datetime-local" id="end" value={accessEnd} onChange={(ev) => { setAccessEnd(ev.target.value) }} />
					</div>
				</div>

				<div>
					<button type="submit">Create</button>
				</div>
			</form>

			<button onClick={() => { router.push('/') }}>Back</button>
		</div>
	);
}