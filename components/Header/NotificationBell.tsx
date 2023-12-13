import { BellIcon } from '@heroicons/react/24/outline'
import HeaderIcon from './HeaderIcon'

/*
	- component just to introduce the idea of a notification button
	- on click, open popup with notifications on event updates, like accepted invites
	- implementation will likely involve a "web socket" for real-time client-server communication
*/

export default function NotificationBell() {
  return (
    <>
      <HeaderIcon Icon={BellIcon} />
    </>
  )
}
