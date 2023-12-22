import { Dispatch, SetStateAction } from 'react'
import Popup from './Popup'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function QrRejected({
  isOpen,
  setIsOpen,
  scannedAt,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  scannedAt: string
}) {
  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      Icon={ExclamationCircleIcon}
      bgStyle="bg-yellow-100"
      iconStyle="text-yellow-700"
      textStyle="text-yellow-700"
    >
      <>
        <p>Invite already used</p>
        <p>{scannedAt}</p>
      </>
    </Popup>
  )
}
