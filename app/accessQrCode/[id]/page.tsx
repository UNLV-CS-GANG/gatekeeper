'use client'

import useLoadData from '@/hooks/useLoadData'
import QRCode from 'qrcode'
import { useState } from 'react'

export default function Qr({ params }: { params: { id: string } }) {
  const [qrSrc, setQrSrc] = useState('')

  useLoadData((data) => {
    QRCode.toDataURL(data.invite.qr).then(setQrSrc)
  }, `/api/invite?id=${params.id}`)

  return (
    <div>
      qr code:
      {/*eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrSrc ? qrSrc : undefined} alt="qrcode" />
    </div>
  )
}
