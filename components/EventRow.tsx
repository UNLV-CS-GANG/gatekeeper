'use client'

import { Event } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function EventRow({ event }: { event: Event }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/manageEvent/${event.id}`)
  }

  return (
    <tr
      className="cursor-pointer transition-colors duration-200 hover:bg-gray-200"
      onClick={handleClick}
      key={event.id}
    >
      <td className="px-3 py-4 text-sm text-black">{event.title}</td>
      <td className="px-3 py-4 text-sm text-black">{event.location}</td>
    </tr>
  )
}
