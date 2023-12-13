import InviteForm from '@/components/Invite/InviteForm'
import authFetch from '@/lib/authFetch'

import { Invite } from '@prisma/client'

export default async function InviteLink({
  params,
}: {
  params: { id: string }
}) {
  async function postInvite(inv: Invite) {
    'use server'

    try {
      const res = await authFetch(`${process.env.BASE_URL}/api/invite`, {
        method: 'POST',
        body: JSON.stringify(inv),
      })

      if (!res.ok) throw Error('Bad request')

      const invite = await res.json()
      console.log('Successful post:', invite)

      return invite
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }

  return (
    <div>
      invite link: {params.id}
      <InviteForm postInvite={postInvite} eventId={params.id} />
    </div>
  )
}
