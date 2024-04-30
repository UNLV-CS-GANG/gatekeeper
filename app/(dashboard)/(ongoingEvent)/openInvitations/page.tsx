import PageWrapper from '@/components/Common/PageWrapper'
import UnderDevelopment from '@/components/State/UnderDevelopment'

export default function openInvitations() {
  return (
    <PageWrapper title="Open Invitations" description="Events that are public to anyone within the organization">
      <UnderDevelopment />
    </PageWrapper>
  )
}
