'use client'

import Loader from '@/components/State/Loader'
import useLoadData from '@/hooks/useLoadData'
import QRCode from 'qrcode'
import { useState } from 'react'

export default function Qr({ params }: { params: { inviteId: string } }) {
  const [qrSrc, setQrSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useLoadData(
    (invite) => {
      QRCode.toDataURL(invite.qr).then(setQrSrc)
    },
    `/api/invite?id=${params.inviteId}`,
    setIsLoading
  )

  return (
    <div className="h-full w-full">
      <div className="relative flex place-items-center justify-center">
        <div className="rounded-xl bg-white p-3">
          <img src={qrSrc ? qrSrc : undefined} />
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </div>
  )
}
