import { CodeBracketIcon } from '@heroicons/react/24/outline'

export default function UnderDevelopment() {
  return (
    <div className="flex w-fit animate-pulse place-items-center justify-center space-x-2 rounded-full bg-yellow-100 px-4 py-2">
      <CodeBracketIcon className="h-6 w-6 text-yellow-700" />
      <p className="text-yellow-700">Under development</p>
    </div>
  )
}
