import classNames from '@/lib/classNames'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ToggleVisibility({ data }: { data: string }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex space-x-2.5">
      <button
        className="rounded-full bg-gray-200 p-0.5 transition-colors duration-150 hover:bg-gray-300"
        onClick={() => setIsVisible(!isVisible)}
      >
        {!isVisible && <EyeSlashIcon className="h-5 w-5" />}
        {isVisible && <EyeIcon className="h-5 w-5" />}
      </button>

      <div>
        <div className={classNames('w-fit rounded-lg bg-gray-200 px-2', isVisible ? '' : 'blur-sm')}>
          <p className="text-gray-800">{data}</p>
        </div>
      </div>
    </div>
  )
}
