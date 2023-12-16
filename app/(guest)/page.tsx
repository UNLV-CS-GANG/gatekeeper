'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="w-[36rem] pt-20 text-center">
            <div className="text-5xl font-medium text-gray-700">
              <h2>Secure your events with</h2>
              <h2>our QR codes</h2>
            </div>
          </div>

          <div className="pt-10">
            <p className="flex justify-center pb-2 font-medium text-gray-700">
              Get started!
            </p>
            <div className="flex justify-center space-x-5">
              <button className="h-14 w-36 rounded-lg bg-gray-300 font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-400 hover:bg-opacity-50 hover:text-gray-700">
                Sign In
              </button>
              <button className="h-14 w-36 rounded-lg bg-gray-600 font-medium text-gray-200 transition-colors duration-150 hover:bg-gray-700 hover:text-gray-100">
                Scan Invites
              </button>
            </div>
          </div>
        </div>
        <p className="absolute bottom-40 flex w-full justify-center">
          {`{${'placeholder for some image'}}`}
        </p>
      </div>

      {/* <button onClick={() => router.push('/myEvents')}>
          go to My Events
        </button> */}
    </>
  )
}
