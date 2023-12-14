import { CodeBracketIcon } from '@heroicons/react/24/outline'
import State from '@/components/State/State'

export default function UnderDevelopment() {
  return (
    <State
      Icon={CodeBracketIcon}
      text="Under development"
      bgColor="bg-orange-200"
      textColor="text-orange-400"
      moreStyle="animate-pulse"
    />
  )
}
