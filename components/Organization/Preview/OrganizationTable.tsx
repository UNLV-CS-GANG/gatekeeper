import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import Table from '@/components/Common/Preview/Table/Table'
import Body from '@/components/Common/Preview/Table/Body'
import Row from '@/components/Common/Preview/Table/Row'
import { useState } from 'react'
import OrganizationModal from '../OrganizationModal'
import RowData from '@/components/Common/Preview/Table/RowData'
import { useRouter } from 'next/navigation'

export default function OrganizationTable({
  organizations,
  isLoadingOrganizations,
}: {
  organizations: OrganizationExtended[]
  isLoadingOrganizations: boolean
}) {
  const router = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganizaiton] = useState<OrganizationExtended | null>(null)
  const headers = ['name', 'visibility', 'members']
  const [isHovering, setIsHovering] = useState(false)

  function handleOrganizationClick(org: OrganizationExtended) {
    setSelectedOrganizaiton(org)
    setModalIsOpen(true)
  }

  return (
    <>
      <Table
        headers={headers}
        displayCount={3}
        isLoadingItems={isLoadingOrganizations}
        itemsLength={organizations.length}
        onAddItem={() => router.push('/createOrganization')}
      >
        <Body displayCount={3} isLoadingItems={isLoadingOrganizations} itemsLength={organizations.length}>
          {organizations.map((org: OrganizationExtended, i: number) => (
            <Row
              item={org}
              key={i}
              onClick={(org) => handleOrganizationClick(org)}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
            >
              <RowData isFirst={true}>{org.name}</RowData>
              <RowData>{org.joinCode ? 'Private' : 'Public'}</RowData>
              <RowData isLast={true}>{org.members.length}</RowData>
            </Row>
          ))}
        </Body>
      </Table>

      {selectedOrganization && (
        <OrganizationModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} organization={selectedOrganization} />
      )}
    </>
  )
}
