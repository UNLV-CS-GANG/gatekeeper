import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import State from '@/components/State/State'

export default function NoData() {
  return (
    <State
      Icon={ExclamationTriangleIcon}
      text="No data"
      bgColor="bg-yellow-100"
      textColor="text-yellow-600"
    />
  )
}
