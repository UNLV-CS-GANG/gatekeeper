import { Dispatch, SetStateAction } from 'react'
import Popup from './Popup'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function QrRejected({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      Icon={XCircleIcon}
      bgStyle="bg-red-300"
      iconStyle="text-red-500"
      textStyle="text-red-600"
    >
      <>
        <p>Invite invalid!</p>
      </>
    </Popup>
  )
}
