export default function InviteLink({ params }: { params: { id: string } }) {
	return (
		<div>
			invite link: { params.id }
		</div>
	)
}
