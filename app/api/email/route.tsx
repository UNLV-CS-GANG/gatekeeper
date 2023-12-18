import InviteRevoked from '@/emails/InviteRevoked'
import Qr from '@/emails/Qr'
import EmailInviteRevokedProps from '@/types/email/EmailInviteRevokedProps'
import EmailQrProps from '@/types/email/EmailQrProps'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const query = {
    to: req.nextUrl.searchParams.get('to'),
    template: req.nextUrl.searchParams.get('template'),
  }

  try {
    if (!query.to || !query.template) throw new Error('Invalid query')

    if (query.template === 'qr') {
      const body: EmailQrProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid QR Props')

      const data = await resend.emails.send({
        from: 'no-reply@unlvgatekeeper.com',
        to: [query.to],
        subject: 'QR Code',
        react: Qr({ ...body }),
      })

      console.log('data from email:', data)

      return NextResponse.json(data, { status: 200 })
    }

    if (query.template === 'invite-revoked') {
      const body: EmailInviteRevokedProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid QR Props')

      const data = await resend.emails.send({
        from: 'no-reply@unlvgatekeeper.com',
        to: [query.to],
        subject: 'QR Code',
        react: InviteRevoked({ ...body }),
      })

      console.log('data from email:', data)

      return NextResponse.json(data, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}
