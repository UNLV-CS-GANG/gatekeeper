'use client'

export default function getDateTime(date: Date) {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  let day = ''

  if (date.toLocaleDateString() === today.toLocaleDateString()) day = 'Today'
  else if (date.toLocaleDateString() === yesterday.toLocaleDateString())
    day = 'Yesterday'
  else day = date.toLocaleDateString()

  return `${day}, ${date.toLocaleTimeString([], {
    timeStyle: 'short',
  })}`
}
