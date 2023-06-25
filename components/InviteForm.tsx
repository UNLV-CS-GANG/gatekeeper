'use client'

// import useLoadEvent from '@/hooks/useLoadEvent'

import { Invite } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import useLoadEvent from '@/hooks/useLoadEvent'

type InviteFormProps = {
	postInvite: (invite: Invite) => Promise<void>
	eventId: string
}

export default function InviteForm({ postInvite, eventId } : InviteFormProps) {
	const { register, handleSubmit } = useForm()
	const [event, setEvent] = useState<Event>()

	const temp_qr = 'asdfasfdasefifasjfasdf'; // update when we can gen qr codes

	function onSubmit(data: FieldValues) {
		postInvite({
			qr: temp_qr,
			isScanned: false,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			eventId,
		} as Invite)
	}

	useLoadEvent((data) => { setEvent(data.event) }, eventId)

	return (
		<div>
			<div>
				Event: { event?.title }
				Location: { event?.location }
			</div>

			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data)
				})}
			>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						className='text-black'
						type='email'
						id='email'
						{...register('email', { required: true, maxLength: 60 })}
					/>
				</div>

				<div>
					<label htmlFor='firstName'>First name:</label>
					<input
						className='text-black'
						type='firstName'
						id='firstName'
						{...register('firstName', { required: true, maxLength: 60 })}
					/>
				</div>

				<div>
					<label htmlFor='lastName'>Last name:</label>
					<input
						className='text-black'
						type='lastName'
						id='lastName'
						{...register('lastName', { required: true, maxLength: 60 })}
					/>
				</div>

				<div>
					<button type='submit'>Accept</button>
				</div>
			</form>
		</div>
	)
}