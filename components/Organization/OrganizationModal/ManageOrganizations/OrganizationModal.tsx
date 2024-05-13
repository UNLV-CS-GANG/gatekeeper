import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../../../Common/Modal/Modal'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import InfoView from './InfoView'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'

export default function OrganizationModal({
  organization,
  isOpen,
  setIsOpen,
}: {
  organization: OrganizationExtended
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [view, setView] = useState<OrganizationModalView>(OrganizationModalView.INFO)

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {view === OrganizationModalView.INFO && <InfoView organization={organization} setView={setView} />}
    </Modal>
  )
}
