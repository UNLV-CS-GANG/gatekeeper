'use client';

import { useRouter } from "next/navigation";

export default function RouteButton({ children, route }: { children: React.ReactNode, route: string }) {
	const router = useRouter();

	return (
		<button className="bg-gray-300 hover:bg-gray-200 font-medium py-2 px-4 ring-1 ring-gray-400 rounded shadow" onClick={() => { router.push(`${route}`) }}>
			{ children }
		</button>
	)
}
