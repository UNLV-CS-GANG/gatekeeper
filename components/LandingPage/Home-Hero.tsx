import ArrowButton from '@/components/Common/ArrowButton'
import { useRouter } from 'next/navigation'
// import Image from 'next/image'
import { HeroImage } from './Hero-Image'

interface HomeHeroProps {
  isSignedIn: boolean
  setModalIsOpen: (value: boolean) => void
}

export const HomeHero = (props: HomeHeroProps) => {
  const { isSignedIn, setModalIsOpen } = props
  const router = useRouter()
  return (
    <div>
      {/* introductory section */}
      <div className="pt-20 text-center sm:pt-32">
        <div className="flex translate-y-[-1rem] animate-fade-in justify-center opacity-0 [--animation-delay:200ms]">
          <h1 className="w-[20rem] text-3xl font-extrabold text-gray-700 sm:w-[35rem] sm:text-6xl">
            Secure your events with our QR codes
          </h1>
        </div>
        <div className="flex translate-y-[-1rem] animate-fade-in justify-center opacity-0 [--animation-delay:400ms]">
          <h2 className="bg w-full px-5 pt-10  text-sm font-medium text-gray-600 sm:w-[50rem] sm:text-xl">
            {
              "Seamlessly safeguard your events by granting all invited attendants a unique QR code that can be easily verified with your device's integrated camera."
            }
          </h2>
        </div>
      </div>

      {/* call to action */}
      <div className="pt-10">
        <div className="flex translate-y-[-1rem] animate-fade-in justify-center space-x-2 opacity-0 [--animation-delay:600ms] sm:space-x-5">
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

      {/* watch demo */}
      <div className="translate-y-[-1rem] animate-fade-in pt-10 opacity-0 [--animation-delay:800ms]">
        <div className="flex justify-center">
          <ArrowButton text="Watch demo" />
        </div>
      </div>

      {/* demo image */}
      <HeroImage />

      {/* background color hues */}
      <div>
        <div className="absolute -left-[8rem] -top-[3rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-pink-200 bg-opacity-40 blur-3xl" />
        <div className="absolute left-[5rem] top-[5rem] -z-10 h-[20rem] w-[20rem] rounded-full  bg-purple-200 bg-opacity-70 blur-3xl sm:bg-pink-200" />
        <div className="absolute left-[20rem] top-[15rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-pink-200 bg-opacity-70 blur-3xl sm:block" />
        <div className="absolute left-[25rem] top-[6rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
        <div className="absolute left-[35rem] top-[2rem] -z-10 hidden h-[20rem] w-[20rem]  rounded-full bg-purple-200 bg-opacity-70 blur-3xl sm:block" />
      </div>
    </div>
  )
}
