import { nanoid } from 'nanoid'

export default function generateShortId() {
  const vcode = nanoid(12)
  const formattedVcode = vcode.match(/.{1,4}/g)?.join('-')

  return formattedVcode
}
