'use client';

import { useState } from "react";
import { Event } from "@prisma/client";

export default function EventForm({ postEvent }) {
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [accessStart, setAccessStart] = useState(Date());
	const [accessEnd, setAccessEnd] = useState(Date()); 

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

	function handleSubmit(ev: React.FormEvent) {
		ev.preventDefault();
		postEvent(event);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
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
		</div>
	);
}