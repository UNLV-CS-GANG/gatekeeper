/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RocketLaunchIcon,
  InformationCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

export interface SidebarTab {
  icon: any
  title: string
  route: string
}

export const primaryTabs = [
  {
    icon: RocketLaunchIcon,
    title: 'My Events',
    route: '/myEvents',
  },
  {
    icon: PlusCircleIcon,
    title: 'New Event',
    route: '/createEvent',
  },
  {
    icon: BookOpenIcon,
    title: 'Invitations',
    route: '/invitations',
  },
]

export const secondaryTabs = [
  {
    icon: UserGroupIcon,
    title: 'About Us',
    route: '/aboutUs',
  },
  {
    icon: InformationCircleIcon,
    title: 'Help',
    route: '/help',
  },
  {
    icon: Cog6ToothIcon,
    title: 'Settings',
    route: '/settings',
  },
]
