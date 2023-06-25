import InviteForm from "@/components/InviteForm"
import authFetch from "@/lib/authFetch"

import { Invite } from "@prisma/client"

export default async function InviteLink({ params }: { params: { id: string } }) {
	async function postInvite(invite: Invite) {
		'use server'

		try {
			const res = await authFetch(`${process.env.BASE_URL}/api/invite`, {
				method: 'POST',
				body: JSON.stringify(invite),
			})

			if (!res.ok) throw Error('Bad request')

			console.log('Successful post:', await res.json());
		} catch (err) {
			console.error('Error:', err)
		}
	}

	return (
		<div>
			invite link: { params.id }
			<InviteForm postInvite={postInvite} eventId={params.id} />
		</div>
	)
}
