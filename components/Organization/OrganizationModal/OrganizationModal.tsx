import { Organization } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../../Common/Modal/Modal'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'

export default function OrganizationModal({
  organization,
  isOpen,
  setIsOpen,
}: {
  organization: Organization
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [view, setView] = useState<OrganizationModalView>(OrganizationModalView.INFO)

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      test
    </Modal>
  )
}
