'use client'

import Loader from '@/components/State/Loader'
import EventExtended from '@/types/EventExtended'
import { Dispatch, SetStateAction, useState } from 'react'

export default function DeleteView({
  event,
  setReason,
  isLoading,
}: {
  event: EventExtended
  setReason: Dispatch<SetStateAction<string>>
  isLoading: boolean
}) {
  const cancelReasonMaxLength = 200
  const [tempReason, setTempReason] = useState('')

  return (
    <div className="relative">
      <div className="flex justify-center space-x-1 pt-4">
        <p className="text-gray-600">Cancel</p>
        <p className="font-medium text-gray-900">{`"${event.title}"?`}</p>
      </div>
      {event.invites.length > 0 && (
        <div className="pt-6">
          <p className="px-32 pb-1 text-center text-gray-600">
            Please provide a reason for canceling. All guests will be notified.
          </p>
          <div className="relative">
            <textarea
              className="h-32 w-full rounded-md border px-4 pt-2 text-gray-800"
              id="description"
              placeholder="Dog ate my homework"
              maxLength={cancelReasonMaxLength}
              value={tempReason}
              onChange={(ev) => {
                setTempReason(ev.target.value)
                setReason(ev.target.value)
              }}
            />
            <p className="absolute bottom-3 right-3 text-sm text-gray-500">
              {cancelReasonMaxLength - tempReason.length} characters left
            </p>
          </div>
        </div>
      )}

      <Loader isLoading={isLoading} text="Deleting" />
    </div>
  )
}
