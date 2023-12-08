'use client'

import { useRouter } from 'next/navigation'

export default function RouteButton({
  children,
  route,
}: {
  children: React.ReactNode
  route: string
}) {
  const router = useRouter()

  return (
    <button
      className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100"
      onClick={() => {
        router.push(`${route}`)
      }}
    >
      {children}
    </button>
  )
}
