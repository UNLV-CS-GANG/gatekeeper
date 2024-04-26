/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RocketLaunchIcon,
  InformationCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  QrCodeIcon,
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
    title: 'Event Hosting',
    tabs: [
      {
        icon: NewspaperIcon,
        title: 'My Events',
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
    title: 'Invitation',
    tabs: [
      {
        icon: QrCodeIcon,
        title: 'My Invitations',
        route: '/invitations',
      },
      {
        icon: BookOpenIcon,
        title: 'Open Invitations',
        route: '/not-found',
      },
    ],
  },
  {
    title: 'Organization',
    tabs: [
      {
        icon: BuildingOffice2Icon,
        title: 'My Organizations',
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
