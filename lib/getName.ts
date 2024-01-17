import { Guest } from '@/types/Guest'
import { GuestMessage } from '@/types/GuestMessage'
import { User } from '@clerk/nextjs/dist/types/server'

export default function getName(user: User | Guest | GuestMessage) {
  return user.username ? user.username : user.firstName + ' ' + user.lastName
}
