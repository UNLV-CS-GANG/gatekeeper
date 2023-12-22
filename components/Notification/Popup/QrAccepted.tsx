import { Dispatch, SetStateAction } from 'react'
import Popup from './Popup'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function QrAccepted({
  isOpen,
  setIsOpen,
  username,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  username: string
}) {
  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      Icon={CheckCircleIcon}
      bgStyle="bg-green-300"
      iconStyle="text-green-600"
      textStyle="text-green-700"
    >
      <>
        <p>Invite verified!</p>
        <p>{username}</p>
      </>
    </Popup>
  )
}
