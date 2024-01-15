import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Loader({ isLoading, text }: { isLoading: boolean; text?: string }) {
  return (
    <>
      {isLoading && (
        <div className="absolute top-0 flex h-full w-full place-items-center justify-center">
          <div className="flex space-x-2 rounded-full bg-gray-400 bg-opacity-80 px-5 py-4 font-medium text-gray-500 backdrop-blur-sm">
            <ArrowPathIcon className="h-6 w-6 animate-spin" />
            <p>{text ? text : 'Loading'}</p>
          </div>
        </div>
      )}
    </>
  )
}
