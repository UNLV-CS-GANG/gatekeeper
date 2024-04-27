import { Dispatch, SetStateAction } from 'react'
import { Switch } from '@headlessui/react'
import classNames from '@/lib/classNames'

export default function BiToggle({
  rightEnabled,
  setRightEnabled,
  leftLabel,
  rightLabel,
}: {
  rightEnabled: boolean
  setRightEnabled: Dispatch<SetStateAction<boolean>>
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div className="flex space-x-2">
      <label
        className={classNames(
          !rightEnabled ? 'font-medium text-gray-900' : 'font-normal text-gray-400',
          'text-sm transition-colors duration-150'
        )}
      >
        {leftLabel}
      </label>
      <Switch
        checked={rightEnabled}
        onChange={setRightEnabled}
        className={classNames(
          'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-white ring-2 ring-gray-600 transition-colors duration-200 ease-in-out'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            rightEnabled ? 'translate-x-4' : 'translate-x-0',
            'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-gray-600 shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <label
        className={classNames(
          rightEnabled ? 'font-medium text-gray-900' : 'font-normal text-gray-400',
          'text-sm transition-colors duration-150'
        )}
      >
        {rightLabel}
      </label>
    </div>
  )
}
