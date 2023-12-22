'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Modal from '@/components/Modal'
import FormSubmitButton from '@/components/FormSubmitButton'
import Loader from '@/components/State/Loader'

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [invalidCode, setInvalidCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function validateCode() {
    try {
      setIsLoading(true)
      setInvalidCode(false)

      console.log('code:', code)

      const res = await fetch(`/api/public/event?verifierCode=${code}`, {
        method: 'GET',
      })

      const event = await res.json()

      if (event) {
        router.push(`/scan/${event.id}`)
      } else {
        setInvalidCode(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="w-[36rem] pt-20 text-center">
            <div className="text-3xl font-medium text-gray-700 sm:text-5xl">
              <h2>Secure your events with</h2>
              <h2>our QR codes</h2>
            </div>
          </div>

          <div className="pt-10">
            <p className="flex justify-center pb-2 font-medium text-gray-700">
              Get started!
            </p>
            <div className="flex justify-center space-x-5">
              <button
                className="h-14 w-36 rounded-lg bg-gray-300 font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-400 hover:bg-opacity-50 hover:text-gray-700"
                onClick={() =>
                  router.push(isSignedIn ? '/myEvents' : '/sign-in')
                }
              >
                {isSignedIn ? 'Dashboard' : 'Register'}
              </button>
              <button
                className="h-14 w-36 rounded-lg bg-gray-600 font-medium text-gray-200 transition-colors duration-150 hover:bg-gray-700 hover:text-gray-100"
                onClick={() => setModalIsOpen(true)}
              >
                Scan Codes
              </button>
            </div>
          </div>
        </div>
        <p className="absolute bottom-40 flex w-full justify-center">
          {`{${'placeholder for some image'}}`}
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        width="sm:max-w-lg max-w-xs"
      >
        <form
          className="relative p-6"
          onSubmit={async (ev) => {
            ev.preventDefault()
            await validateCode()
          }}
        >
          <p className="flex justify-center pb-4 pt-4 font-medium text-gray-600 sm:pt-0 sm:text-lg">
            Enter verifier code to continue to scanner
          </p>
          <div className="flex justify-center pb-4">
            <input
              type="text"
              className="h-10 w-full rounded-lg border px-4 text-center text-lg placeholder-gray-300"
              placeholder="xxxx-xxxx-xxxx"
              value={code}
              onChange={(ev) => setCode(ev.target.value)}
            />
          </div>
          <FormSubmitButton isDisabled={code.length != 14} text="Confirm" />
          {invalidCode && (
            <p className="mt-5 rounded-full bg-red-100 p-1 text-center text-red-800">
              Invalid verifier code
            </p>
          )}

          <Loader isLoading={isLoading} />
        </form>
      </Modal>
    </>
  )
}
