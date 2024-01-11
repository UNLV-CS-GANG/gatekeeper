'use client'

/*
	Create User in database if it doesn't exist
*/

import { clerkClient, useAuth } from '@clerk/nextjs'
import { User } from '@prisma/client'

export default async function useSetupUser() {
  const { userId } = useAuth()
  const clerkUser = await clerkClient.users.getUser(String(userId))

  try {
    const res = await fetch(`/api/user?id=${userId}`, {
      method: 'GET',
    })

    const data = await res.json()

    // if not found, link user in db
    if (!data) {
      const res = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify({
          id: userId,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          username: clerkUser.username,
        } as User),
      })

      console.log('created user:', await res.json())
    }
  } catch (error) {
    console.error(error)
  }
}
