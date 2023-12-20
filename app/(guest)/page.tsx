'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Modal from '@/components/Modal'
import FormSubmitButton from '@/components/FormSubmitButton'

export default function LandingPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()
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

  useEffect(() => {
    if (isSignedIn) router.push('/myEvents')
  })

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
              <button
                className="h-14 w-36 rounded-lg bg-gray-300 font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-400 hover:bg-opacity-50 hover:text-gray-700"
                onClick={() => router.push('/sign-in')}
              >
                Sign In
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
        width="max-w-lg"
      >
        <form
          className="p-6"
          onSubmit={async (ev) => {
            ev.preventDefault()
            await validateCode()
          }}
        >
          <p className="flex justify-center pb-4 text-lg font-medium text-gray-600">
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
        </form>
      </Modal>
    </>
  )
}
