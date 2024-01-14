import { footerContent } from '@/data/footer-data'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <hr className="sm:mb-15 sm:mt-15 mb-10 mt-10" />
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 grid gap-8 md:mb-12 md:grid-cols-12 lg:gap-20">
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                <Link href={footerContent.logo.link} className="inline-block" aria-label={footerContent.logo.alt}>
                  {/* Logo image here if needed */}
                </Link>
              </div>
              <div className="mb-4 text-muted-foreground">
                Gatekeeper is a web application that allows users to scan QR codes to check in and out of locations.
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-7">
              {footerContent.blocks.map((block, index) => (
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

          <div className="md:flex md:items-center md:justify-between">
            <div className="mr-4 text-sm text-muted-foreground">
              &copy; {currentYear} {footerContent.copyright}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
