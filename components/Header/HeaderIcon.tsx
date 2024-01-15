import React from 'react'
import { cn } from '@/lib/cn'

interface HeaderIconProps {
  Icon: React.ElementType
  moreIconStyle?: string
  svgStyle?: string
}

/* EXTENDED M________________________ */
const HeaderIcon: React.FC<HeaderIconProps & { isRotated?: boolean }> = ({
  Icon,
  moreIconStyle,
  isRotated,
  svgStyle,
}) => {
  
  const rotationClass = isRotated ? 'rotate-360' : 'rotate-0'

  return (
    <div className={`cursor-pointer rounded-full p-1 transition-transform duration-500 ${rotationClass}`}>
      {svgStyle ? (
        // moon
        <img src={svgStyle} alt="theme" className={cn('h-8 w-8', moreIconStyle ? moreIconStyle : 'text-gray-600')} />
      ) : (
        // sun
        <Icon className={cn(moreIconStyle ? moreIconStyle : 'text-gray-600')} />
      )}
    </div>
  )
}

export default HeaderIcon
