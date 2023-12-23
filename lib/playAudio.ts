import { MutableRefObject } from 'react'

export default function playAudio(
  src: string,
  ref: MutableRefObject<HTMLAudioElement | null>
) {
  if (ref.current) {
    ref.current.src = src
    ref.current.play()
  }
}
