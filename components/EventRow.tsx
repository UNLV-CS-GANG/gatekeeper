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
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.title}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.location}</td>
    </tr>
  )
}
