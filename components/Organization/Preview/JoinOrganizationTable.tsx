import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import Table from '@/components/Common/Preview/Table/Table'
import Body from '@/components/Common/Preview/Table/Body'
import Row from '@/components/Common/Preview/Table/Row'
import { useState } from 'react'
import RowData from '@/components/Common/Preview/Table/RowData'
import JoinOrganizationModal from '../OrganizationModal/JoinOrganization/JoinOrganizationModal'

export default function JoinOrganizationTable({
  organizations,
  isLoadingOrganizations,
  displayCount,
}: {
  organizations: OrganizationExtended[]
  isLoadingOrganizations: boolean
  displayCount: number
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganizaiton] = useState<OrganizationExtended | null>(null)
  const headers = ['name', 'owner', 'members', 'next event']

  function handleOrganizationClick(org: OrganizationExtended) {
    setSelectedOrganizaiton(org)
    setModalIsOpen(true)
  }

  return (
    <>
      <Table
        headers={headers}
        displayCount={displayCount}
        isLoadingItems={isLoadingOrganizations}
        itemsLength={organizations.length}
      >
        <Body displayCount={displayCount} isLoadingItems={isLoadingOrganizations} itemsLength={organizations.length}>
          {organizations.map((org: OrganizationExtended, i: number) => (
            <Row item={org} key={i} onClick={(org) => handleOrganizationClick(org)}>
              <RowData isFirst={true} index={i} itemsLength={organizations.length}>
                {org.name}
              </RowData>
              <RowData index={i} itemsLength={organizations.length}>
                {org.owner.id}
              </RowData>
              <RowData index={i} itemsLength={organizations.length}>
                {org.members.length}
              </RowData>
              <RowData index={i} itemsLength={organizations.length} isLast={true}>
                {'Pie Eating Contest'}
              </RowData>
            </Row>
          ))}
        </Body>
      </Table>

      {selectedOrganization && (
        <JoinOrganizationModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} organization={selectedOrganization} />
      )}
    </>
  )
}
