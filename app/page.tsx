'use client';

import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter();

	return (
		<div>
			<UserButton afterSignOutUrl="/" />
			init page
			<div>
				<button onClick={() => {router.push('/createEvent')}}>Create Event</button>
			</div>
		</div>
	);
}
