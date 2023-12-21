import GuestHeader from '@/components/Header/GuestHeader'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 w-full">
        <GuestHeader />
      </div>
      <div className="h-full bg-gray-100 px-10 pt-24">{children}</div>
    </div>
  )
}



/* 
  Thien here, this is the idea

  1. Gonna give it some new components:
    + New nav bar, sorta look like (thanks cruz)
      + Logo from logoai.com, 
      + The #navigation that link here and there to a single page application (thanks cruz again)
    + New footer, my stuff from MUI
    + A section that said, MEET OUR TEAM, catenary landing page, ye
    + A section that said, Everything you need to know, MUI
  
  2. Theme toggle, dark mode
*/