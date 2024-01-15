import React from 'react'
import { cn } from '@/lib/cn'

interface HeaderIconProps {
  Icon: React.ElementType
  moreIconStyle?: string
  moon?: string
  sun?: boolean
}

/* EXTENDED M________________________ */
const HeaderIcon: React.FC<HeaderIconProps & { isRotated?: boolean }> = ({
  Icon,
  moreIconStyle,
  isRotated,
  moon,
  sun,
}) => {
  const rotationClass = isRotated ? '-rotate-360' : 'rotate-0'

  return (
    <div className={`cursor-pointer rounded-full p-1 transition-transform duration-500 ${rotationClass}`}>
      {moon ? (
        // Moon
        <img src={moon} alt="moon" className={cn('h-8 w-8', moreIconStyle ? moreIconStyle : 'text-gray-600')} />
      ) : sun ? (
        // Sun, TEMPORARY
        <Icon className={cn('h-8 w-8', moreIconStyle ? moreIconStyle : 'dark:text-white')} />
      ) : (
        // Default, temporarily till we configure our sun
        <Icon className={cn(moreIconStyle ? moreIconStyle : 'h-8 w-8', 'dark:text-black')} />
      )}
    </div>
  )
}

export default HeaderIcon
