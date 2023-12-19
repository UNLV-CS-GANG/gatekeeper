import { nanoid } from 'nanoid'

export default function generateShortId() {
  return nanoid(12)
}
