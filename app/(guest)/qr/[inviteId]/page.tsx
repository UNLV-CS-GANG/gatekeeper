/* eslint-disable @next/next/no-img-element */
'use client'

import Loader from '@/components/State/Loader'
import useLoadData from '@/hooks/useLoadData'
// import Image from 'next/image'
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
          {qrSrc && <img src={qrSrc} alt="qr" />}
          {!qrSrc && <p className="text-gray-700">Failed to load QR code</p>}
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </div>
  )
}
