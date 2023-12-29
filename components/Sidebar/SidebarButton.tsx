import classNames from '@/lib/classNames'
import Sidebar from './Sidebar'
import { Dispatch, SetStateAction } from 'react'

export default function SidebarButton({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}) {
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>{children}</button>

      <div
        className={classNames(
          isOpen ? 'translate-x-0' : '-translate-x-[30rem]',
          'absolute left-0 z-30 h-screen w-2/3 transform bg-white pt-5 transition duration-700 ease-in-out'
        )}
      >
        <Sidebar onRoute={() => setIsOpen(false)} />
      </div>
    </>
  )
}
