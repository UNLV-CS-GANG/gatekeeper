import { ArrowRightIcon } from '@heroicons/react/20/solid'

export default function ArrowButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <>
      <div className="relative">
        <button
          className="rounded-2xl py-2 pl-3 pr-9 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-500 hover:bg-opacity-20 hover:text-gray-900 sm:text-base"
          onClick={onClick}
        >
          <p className="font-semibold">{text}</p>
          <ArrowRightIcon className="absolute right-3 top-[0.35rem] h-5 w-5 sm:right-3 sm:top-2.5" />
        </button>
      </div>
    </>
  )
}
