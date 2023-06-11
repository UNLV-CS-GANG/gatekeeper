'use client';

import { FieldValues, useForm } from "react-hook-form";

export default function EventForm({ postEvent, userId }) {
	const { register, handleSubmit } = useForm();

	const temp_inviteLink = 'www.templink.com/until/we/can/gen/ourselves';
	const temp_verifierCode = 'abc123';

	function onSubmit(data: FieldValues) {
		postEvent({
			title: data.title,
			location: data.location,
			accessStart: new Date(data.accessStart),
			accessEnd: new Date(data.accessEnd),
			inviteLink: temp_inviteLink,
			verifierCode: temp_verifierCode,
			hostId: userId,
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit((data) => { onSubmit(data) })}>
				<div>
					<label htmlFor="title">Title:</label>
					<input className="text-black" type="text" id="title" {...register('title', { required: true, maxLength: 24 })} />
				</div>

				<div>
					<label htmlFor="location">Location:</label>
					<input className="text-black" type="text" id="location" {...register('location', { required: true, maxLength: 60 })} />
				</div>

				<div>
					<p>Invite access:</p>
					<div>
						<label htmlFor="access-start">Access Start:</label>
						<input className="text-black" type="datetime-local" id="access-start" {...register('accessStart', { required: true })} />
						<label htmlFor="access-end">Access Expires:</label>
						<input className="text-black" type="datetime-local" id="access-end" {...register('accessEnd', { required: true })} />
					</div>
				</div>

				<div>
					<button type="submit">Create</button>
				</div>
			</form>
		</div>
	);
}
