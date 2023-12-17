import { SignIn } from '@clerk/nextjs'

export default function Signin() {
  return (
    <div className="flex h-screen w-screen place-items-center justify-center bg-gray-100">
      <SignIn afterSignInUrl={'/myEvents'} />
    </div>
  )
}
