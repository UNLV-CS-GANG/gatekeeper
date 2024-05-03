import { Organization } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import Modal from '../Common/Modal/Modal'

export default function OrganizationModal({
  organization,
  isOpen,
  setIsOpen,
}: {
  organization: Organization
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  // const [view, setView] = useState<EventModalView>(EventModalView.INFO)

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-4 sm:px-7 sm:py-6">org modal: {organization.name}</div>
    </Modal>
  )
}
