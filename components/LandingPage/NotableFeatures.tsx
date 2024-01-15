import FeatureDetails from '@/components/LandingPage/FeatureDetails'

import {
  AtSymbolIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline'

export const NotableFeatures = () => {
  return (
    <div className="relative">
      <div className="pt-20 text-center sm:pt-32">
        <div className="flex justify-center">
          <h1 className="w-[20rem] text-xl font-extrabold text-gray-700 sm:w-[35rem] sm:text-4xl">
            Setup, then invite!
          </h1>
        </div>
        <div className="flex justify-center">
          <h2 className="bg w-full px-5 pt-10 text-sm font-medium text-gray-600 sm:w-[50rem] sm:text-xl">
            {
              // TODO need to change the language here, too lengthy
              "Getting started is easy. Just create an event with all your specifications, including location and access times. Then send the invite link to all your expected guests. Once they fill out the invitation, they'll be emailed their QR code which will be handy for getting into the event."
            }
          </h2>
        </div>
      </div>

      <div className="w-full px-5 pt-14">
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
  )
}
