import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

export default function SearchBar({
  setSearchInput,
}: {
  setSearchInput: Dispatch<SetStateAction<string>>
}) {
  const [tempInput, setTempInput] = useState('')
  const debouncedInput = useDebounce(tempInput, 400)

  useEffect(() => {
    console.log('search input:', tempInput)
    setSearchInput(tempInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput])

  return (
    <div className="relative">
      <div className="absolute left-6 top-4">
        {!tempInput ? (
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        ) : (
          <button onClick={() => setTempInput('')} className="rounded-full hover:bg-gray-300">
            <XMarkIcon className="h-6 w-6 p-0.5 text-gray-500 hover:text-gray-600" />
          </button>
        )}
      </div>
      <input
        onChange={(ev) => {
          setTempInput(ev.target.value)
        }}
        type="text"
        value={tempInput}
        className="h-14 w-full rounded-lg bg-gray-200 pl-16 text-sm placeholder:text-gray-500"
        placeholder="Search by title or location"
      />
    </div>
  )
}
