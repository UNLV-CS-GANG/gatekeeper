export const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {children}
      </div>
    </div>
  )
}
