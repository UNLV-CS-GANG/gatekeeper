'use client'

import { Button } from '@/components/Common/Custom-Button'
import HeaderIcon from '@/components/Header/HeaderIcon'
import { SunIcon } from '@heroicons/react/20/solid'
import { MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useState } from 'react'

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [isRotated, setIsRotated] = useState(false)

  const currentTheme = resolvedTheme || 'light'

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
    setIsRotated((prev) => !prev) // Toggle the rotation state
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleToggleTheme} rel="noreferrer">
      <div className="flex items-center justify-center">
        {currentTheme === 'dark' ? (
          <HeaderIcon Icon={SunIcon} isRotated={isRotated} theme />
        ) : (
          <HeaderIcon Icon={MoonIcon} isRotated={isRotated} svgStyle="/theme/moon.svg" theme />
        )}
      </div>
    </Button>
  )
}

export default ThemeToggle
