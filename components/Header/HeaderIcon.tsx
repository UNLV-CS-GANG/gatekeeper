import React from 'react'
import { cn } from '@/lib/cn'

interface HeaderIconProps {
  Icon: React.ElementType
  moreIconStyle?: string
  svgStyle?: string
}

/* EXTENDED M________________________ */
const HeaderIcon: React.FC<HeaderIconProps & { isRotated?: boolean; theme?: boolean }> = ({
  Icon,
  moreIconStyle,
  isRotated,
  svgStyle,
  theme,
}) => {
  const rotationClass = isRotated ? '-rotate-180' : 'rotate-0'

  return (
    <div className={`cursor-pointer rounded-full p-1 transition-transform duration-500 ${rotationClass}`}>
      {svgStyle && theme ? (
        // Moon
        <img src={svgStyle} alt="theme" className={cn('h-7 w-7', moreIconStyle ? moreIconStyle : 'text-gray-600')} />
      ) : theme ? (
        // Sun
        <Icon className={cn('h-8 w-8', moreIconStyle ? moreIconStyle : 'text-white')} />
      ) : (
        // Default
        <Icon className={cn(moreIconStyle ? moreIconStyle : '', 'h-8 w-8 dark:text-black')} />
      )}
    </div>
  )
}

export default HeaderIcon
