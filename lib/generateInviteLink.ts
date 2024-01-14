export default function generateInviteLink(eventId: string) {
  return `${process.env.BASE_URL}/invite/${eventId}`
}
