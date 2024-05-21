import InvitePrompt from '@/components/Invite/InvitePrompt'
import type { Invite } from '@prisma/client'

export default async function Invite({ params }: { params: { eventId: string } }) {
  return (
    <div className="h-full">
      <InvitePrompt eventId={params.eventId} />
    </div>
  )
}
