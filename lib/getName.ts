import { Guest } from '@/types/Guest'
import { User } from '@clerk/nextjs/dist/types/server'

export default function getName(user: User | Guest) {
  return user.username ? user.username : user.firstName + ' ' + user.lastName
}
