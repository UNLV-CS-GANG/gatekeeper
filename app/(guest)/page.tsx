'use client'

import FormSubmitButton from '@/components/Common/FormSubmitButton'
import Modal from '@/components/Common/Modal'
import Contributors from '@/components/LandingPage/Contributors'
import Loader from '@/components/State/Loader'
import { useAuth } from '@clerk/nextjs'

import { HomeHero } from '@/components/LandingPage/Home-Hero'
import { NotableFeatures } from '@/components/LandingPage/NotableFeatures'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [invalidCode, setInvalidCode] = useState(false)

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
      <HomeHero isSignedIn={isSignedIn ?? false} setModalIsOpen={setModalIsOpen} />
      <NotableFeatures />
      <Contributors />
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} width="sm:max-w-lg max-w-xs">
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
            <p className="mt-5 rounded-full bg-red-100 px-4 py-3 text-center text-sm text-red-800">
              Invalid verifier code
            </p>
          )}

          <p className="hidden rounded-full bg-yellow-100 text-center text-sm text-yellow-700 sm:mt-5 sm:block sm:px-4 sm:py-3">
            Disclaimer: Scanner feature is intended for mobile devices and may be unstable on a laptop/desktop
          </p>
        </form>
        <Loader isLoading={isLoading} />
      </Modal>
    </>
  )
}
