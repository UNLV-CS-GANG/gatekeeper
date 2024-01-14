'use client'

import ArrowButton from '@/components/Common/ArrowButton'
import FormSubmitButton from '@/components/Common/FormSubmitButton'
import Modal from '@/components/Common/Modal'
import FeatureDetails from '@/components/LandingPage/FeatureDetails'
import Loader from '@/components/State/Loader'
import { useAuth } from '@clerk/nextjs'
import {
  AtSymbolIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [code, setCode]               = useState('')
  const [isLoading, setIsLoading]     = useState(false)
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
      <div>
        {/* introductory section */}
        <div className="pt-20 text-center sm:pt-32">
          <div className="flex justify-center">
            <h1 className="w-[20rem] text-3xl font-extrabold text-gray-700 sm:w-[35rem] sm:text-6xl">
              Secure your events with our QR codes
            </h1>
          </div>
          <div className="flex justify-center">
            <h2 className="bg w-full pt-10 text-sm font-medium text-gray-600 sm:w-[50rem] sm:text-xl">
              {
                "Seamlessly safeguard your events by granting all invited attendants a unique QR code that can be easily verified with your device's integrated camera."
              }
            </h2>
          </div>
        </div>

        <div className="pt-10">
          <div className="flex justify-center space-x-2 sm:space-x-5">
            <button
              className="h-10 w-28 rounded-lg bg-gray-300 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-400 hover:bg-opacity-50 hover:text-gray-700 sm:h-14 sm:w-36 sm:text-base"
              onClick={() => router.push(isSignedIn ? '/myEvents' : '/sign-in')}
            >
              {isSignedIn ? 'Dashboard' : 'Register'}
            </button>
            <button
              className="h-10 w-28 rounded-lg bg-gray-600 text-sm font-medium text-gray-200 transition-colors duration-150 hover:bg-gray-700 hover:text-gray-100 sm:h-14 sm:w-36 sm:text-base"
              onClick={() => setModalIsOpen(true)}
            >
              Scan Codes
            </button>
          </div>
        </div>

        <div className="pt-10">
          <div className="flex justify-center">
            <ArrowButton text="Watch demo" />
          </div>
        </div>

        <div className="mt-10 h-fit w-fit rounded-xl bg-gray-200 p-1 ring-1 ring-gray-300 sm:p-4">
          <Image
            className="rounded-lg shadow-lg ring-1 ring-gray-300"
            src="/image/dashboard_preview.png"
            alt="Dashboard preview"
            width={2432}
            height={1442}
            priority
          />
        </div>

        {/* background color hues */}
        <div>
          <div className="absolute -left-[8rem] -top-[3rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-pink-200 bg-opacity-40 blur-3xl" />
          <div className="absolute left-[5rem] top-[5rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-purple-200 bg-opacity-70 blur-3xl sm:bg-pink-200" />
          <div className="absolute left-[20rem] top-[15rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-pink-200 bg-opacity-70 blur-3xl sm:block" />
          <div className="absolute left-[25rem] top-[6rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
          <div className="absolute left-[35rem] top-[2rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
        </div>
      </div>

      {/* notable features section */}
      <div className="relative">
        <div className="pt-20 text-center sm:pt-32">
          <div className="flex justify-center">
            <h1 className="w-[20rem] text-xl font-extrabold text-gray-700 sm:w-[35rem] sm:text-4xl">
              Setup, then invite!
            </h1>
          </div>
          <div className="flex justify-center">
            <h2 className="bg w-full pt-10 text-sm font-medium text-gray-600 sm:w-[50rem] sm:text-xl">
              {
                "Getting started is easy. Just create an event with all your specifications, including location and access times. Then send the invite link to all your expected guests. Once they fill out the invitation, they'll be emailed their QR code which will be handy for getting into the event."
              }
            </h2>
          </div>
        </div>

        <div className="w-full pt-14">
          <div className="sm:flex sm:justify-center">
            <div className="space-y-6 sm:grid sm:w-4/6 sm:grid-flow-col sm:grid-rows-3 sm:gap-x-20 sm:gap-y-8 sm:space-y-0">
              <FeatureDetails
                Icon={QrCodeIcon}
                title="Unique Qr Codes"
                description="Effortlessly scan your code at the event entrance, eliminating the need for physical tickets and ensuring a hassle-free entry process."
              />
              <FeatureDetails
                Icon={ViewfinderCircleIcon}
                title="Convenient verification"
                description="No need for a QR scanning device. You will be able to verify codes with your device's own integrated camera. Just press the Scan codes button above and enter your event's verifier code."
              />
              <FeatureDetails
                Icon={ChatBubbleOvalLeftIcon}
                title="Event group chat"
                description="Users with access to an event will be able to interact in a dedicated group chat. Here, the host and guests can engage in conversation or coordinate plans."
              />
              <FeatureDetails
                Icon={AtSymbolIcon}
                title="Email notifications"
                description="As a guest, receive email notifications whenever changes occur to the event you were invited to."
              />
              <FeatureDetails
                Icon={BellIcon}
                title="Real-time app notifications"
                description="As an event host, get notifications as soon as a guest accepts your invite."
              />
              <FeatureDetails
                Icon={DevicePhoneMobileIcon}
                title="Native mobile support"
                description="Coming soon! This integration will allow you to use a native mobile version of our web-app."
              />
            </div>
          </div>
        </div>

        {/* background color hues */}
        <div>
          <div className="absolute -right-[8rem] -top-[3rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-pink-200 bg-opacity-40 blur-3xl" />
          <div className="absolute right-[5rem] top-[5rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-purple-200 bg-opacity-70 blur-3xl sm:bg-pink-200" />
          <div className="absolute right-[20rem] top-[15rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-pink-200 bg-opacity-70 blur-3xl sm:block" />
          <div className="absolute right-[25rem] top-[6rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
          <div className="absolute right-[35rem] top-[2rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
        </div>
      </div>

      {/* footer */}
      <hr className="mb-20 mt-20 sm:mb-40 sm:mt-40" />
      <div className="flex place-items-center justify-center pb-40">footer placeholder</div>

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
