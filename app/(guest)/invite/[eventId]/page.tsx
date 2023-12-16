import InviteForm from '@/components/Invite/InviteForm'
import { Invite } from '@prisma/client'

export default async function Invite({
  params,
}: {
  params: { eventId: string }
}) {
  return (
    <div className="h-full">
      <InviteForm eventId={params.eventId} />
    </div>
  )
}
