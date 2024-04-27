import { nanoid } from 'nanoid'

export default function generateCode() {
  const code = nanoid(12)
  const formattedCode = code.match(/.{1,4}/g)?.join('-')
  return formattedCode
}
