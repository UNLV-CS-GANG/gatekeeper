'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <>
      <div>
        <button onClick={() => router.push('/myEvents')}>
          go to My Events
        </button>
      </div>
    </>
  )
}
