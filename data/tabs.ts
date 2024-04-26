/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RocketLaunchIcon,
  InformationCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  QrCodeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'

export interface SidebarTab {
  icon: any
  title: string
  route: string
}

export interface SidebarGroup {
  title: string
  tabs: SidebarTab[]
}

export const groupedTabs: SidebarGroup[] = [
  {
    title: 'Hosting',
    tabs: [
      {
        icon: PencilSquareIcon,
        title: 'Manage Events',
        route: '/myEvents',
      },
      {
        icon: PlusCircleIcon,
        title: 'Create Event',
        route: '/createEvent',
      },
    ] as SidebarTab[],
  },
  {
    title: 'Event',
    tabs: [
      {
        icon: QrCodeIcon,
        title: 'Private Events',
        route: '/myInvitations',
      },
      {
        icon: NewspaperIcon,
        title: 'Public Events',
        route: '/openInvitations',
      },
    ],
  },
  {
    title: 'Organization',
    tabs: [
      {
        icon: BuildingOffice2Icon,
        title: 'Manage Organizations',
        route: '/not-found',
      },
      {
        icon: RocketLaunchIcon,
        title: 'Create Organization',
        route: '/not-found',
      },
      {
        icon: GlobeAmericasIcon,
        title: 'Join Organization',
        route: '/not-found',
      },
    ],
  },
]

export const isolatedTabs: SidebarTab[] = [
  {
    icon: InformationCircleIcon,
    title: 'Help',
    route: '/help',
  },
  {
    icon: UserGroupIcon,
    title: 'About Us',
    route: '/aboutUs',
  },
  {
    icon: Cog6ToothIcon,
    title: 'Settings',
    route: '/settings',
  },
]
