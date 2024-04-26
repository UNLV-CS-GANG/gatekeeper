import { SignUp } from '@clerk/nextjs'
import { paths } from '@/data/paths'

export default function Signup() {
  return (
    <div className="flex h-screen w-screen place-items-center justify-center bg-gray-100">
      <SignUp afterSignUpUrl={paths.dashboard} />
    </div>
  )
}
