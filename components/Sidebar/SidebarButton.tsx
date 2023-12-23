import { useState } from 'react'
import classNames from '@/lib/classNames'
import Sidebar from './Sidebar'

export default function SidebarButton({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>{children}</button>

      <div
        className={classNames(
          isOpen ? 'translate-x-0' : '-translate-x-[30rem]',
          'absolute left-0 z-30 h-screen w-2/3 transform bg-white pt-5 transition duration-700 ease-in-out'
        )}
      >
        <Sidebar />
        {/* test */}
      </div>
    </>
  )
}
