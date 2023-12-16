import InviteForm from '@/components/Invite/InviteForm'
import { Invite } from '@prisma/client'

export default async function InviteLink({
  params,
}: {
  params: { id: string }
}) {
  // async function postInvite(inv: Invite) {
  //   try {
  //     const res = await fetch(`/api/invite`, {
  //       method: 'POST',
  //       body: JSON.stringify(inv),
  //     })

  //     if (!res.ok) throw Error('Bad request')

  //     const invite = await res.json()
  //     console.log('Successful post:', invite)

  //     return invite
  //   } catch (err) {
  //     console.error('Error:', err)
  //     return null
  //   }
  // }

  return (
    <div>
      invite link: {params.id}
      <InviteForm eventId={params.id} />
    </div>
  )
}
