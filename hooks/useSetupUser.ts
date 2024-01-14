'use client'

/*
	Create User in database if it doesn't exist
*/

import { useAuth } from '@clerk/nextjs'
import { User } from '@prisma/client'
import { useEffect } from 'react'

export default async function useSetupUser() {
  const { userId } = useAuth()

  useEffect(() => {
    const setupUser = async () => {
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
            } as User),
          })

          console.log('created user:', await res.json())
        } else {
          console.log('user exists')
        }
      } catch (error) {
        console.error(error)
      }
    }
    setupUser()
  }, [])
}
