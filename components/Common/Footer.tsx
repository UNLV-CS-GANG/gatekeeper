import { footerData } from '@/data/footer-data'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '@/components/Common/Theme-Toggle'
import { FooterWrapper } from '@/components/Common/Footer-Wrapper'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <hr className="sm:mb-15 sm:mt-15 mb-10 mt-10" />
      <FooterWrapper>

        {/* TOP SECTION */}
        <div className="mb-8 grid gap-8 md:mb-12 md:grid-cols-12 lg:gap-20">
          {/* TOP LEFT */}
          <div className="md:col-span-4 lg:col-span-5">
            {/* Logo */}
            <div className="mb-2">
              <Link href={footerData.logo.link} className="inline-block" aria-label={footerData.logo.alt}>
                {/* Logo image, change but imma pick one LMAFO */}
                <Image
                  src={footerData.logo.src}
                  className="h-10 dark:invert"
                  alt={footerData.logo.alt}
                  priority
                  width={40}
                  height={40}
                />
              </Link>
            </div>

            {/* Gaslighting */}
            <div className="mb-4 text-muted-foreground">
              Gatekeeper is a web application that allows users to scan QR codes to check in and out of locations.
            </div>
          </div>

          {/* TOP RIGHT */}
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-7">
            {footerData.blocks.map((block, index) => (
              <div className="text-sm" key={index}>
                <h6 className="mb-1 font-medium text-foreground brightness-90">{block.title}</h6>
                <ul>
                  {block.links.map((link, linkIndex) => (
                    <li className="group mb-1" key={linkIndex}>
                      <Link
                        href={link.href}
                        className="flex items-center text-muted-foreground transition duration-150 ease-in-out group-hover:text-foreground"
                      >
                        <div className="mr-2 h-0.5 w-3 bg-pink-400 transition-all group-hover:w-5"></div>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="md:flex md:items-center md:justify-between">
          {/* COPY RIGHT */}
          <div className="mr-4 text-sm text-muted-foreground">
            &copy; {currentYear} {footerData.copyright}
          </div>

          <ThemeToggle />
        </div>


      </FooterWrapper>
    </>
  )
}
