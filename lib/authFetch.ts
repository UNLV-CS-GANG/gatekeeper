'use server'

import { auth }  from '@clerk/nextjs'

type FetchOptions = {
	method: string;
	body: string;
}

export default async function authFetch(url: string, options: FetchOptions) {
	const { getToken } = auth();
	const accessToken = await getToken();

	const res = await fetch(url, {
		method: options.method,
		headers: {
			'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
		},
		body: options.body,
	});

	return res;
}
