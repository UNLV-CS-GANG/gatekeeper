// Navbar.tsx
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'
import { UserButton } from '@clerk/nextjs'
interface Menu {
  text: string
  href: string
}
const MENU_LIST: Menu[] = [
  // FIXME: Add hrefs
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/' },
  { text: 'Contact', href: '/' },
]
const Navbar: React.FC = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null)
  const [activeIdx, setActiveIdx] = useState<number>(-1)
  return (
    <header className="sticky top-0 z-30 bg-gray-100 p-4 h-16">
      <nav className={`flex items-center justify-between`}>
        <Link href="/" className="font-bold">
          <h1>Guard Not Keeping</h1>
        </Link>
        <div
          className={`fixed right-0 top-16 flex w-72 flex-col gap-6 bg-gray-100 p-6 transition-all duration-200 ${
            navActive ? 'right-0' : 'right-full'
          } `}
        >
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx)
                setNavActive(false)
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
        <div className="">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  )
}
export default Navbar