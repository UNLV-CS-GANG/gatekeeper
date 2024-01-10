import { Dispatch, SetStateAction } from 'react'
import SlideOver from './SlideOver'
import { useAuth, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function GuestSlideOver({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <>
      <SlideOver isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="space-y-5 divide-y divide-gray-300 pl-1 font-medium">
          <div className="flex flex-col space-y-5">
            <button className="flex">About</button>
            <button className="flex">GitHub</button>
            <button className="flex">Contact</button>
          </div>
          <div className="flex pt-5">
            {isSignedIn ? (
              <button onClick={() => signOut(() => router.push('/'))}>
                Log out
              </button>
            ) : (
              <button onClick={() => router.push('/sign-in')}>Log in</button>
            )}
          </div>
        </div>
      </SlideOver>
    </>
  )
}
