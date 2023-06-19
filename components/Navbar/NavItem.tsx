'use client'
import Link from 'next/link'
interface NavItemProps {
  text: string
  href: string
  active: boolean
}
const NavItem: React.FC<NavItemProps> = ({ text, href, active }) => {
  return (
    <Link href={href} className={`nav__item ${active ? 'active' : ''}`}>
      {text}
    </Link>
  )
}
export default NavItem