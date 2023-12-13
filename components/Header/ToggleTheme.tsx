import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import HeaderIcon from './HeaderIcon'
import { useState } from 'react'

/*
	- component just to introduce dark/light mode themes
	- on click, toggle dark/light mode
*/

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(false)

  function handleToggle() {
    setIsDark(!isDark)
  }

  return (
    <>
      <button onClick={handleToggle}>
        {!isDark && <HeaderIcon Icon={SunIcon} />}
        {isDark && <HeaderIcon Icon={MoonIcon} />}
      </button>
    </>
  )
}
