import classNames from '@/lib/classNames'
import React from 'react'

export default function UserListData({ children, isFront }: { children: React.ReactNode; isFront?: boolean }) {
  return (
    <div className={classNames(isFront ? 'justify-start pl-4 text-left' : 'justify-end pr-4 text-right', 'py-2')}>
      {children}
    </div>
  )
}
