import EventCanceled from '@/emails/EventCanceled'
import EventChanges from '@/emails/EventChanges'
import InviteRevoked from '@/emails/InviteRevoked'
import Qr from '@/emails/Qr'
import EventCanceledProps from '@/types/email/EventCanceledProps'
import EventChangesProps from '@/types/email/EventChangesProps'
import InviteRevokedProps from '@/types/email/InviteRevokedProps'
import QrProps from '@/types/email/QrProps'
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
      const body: QrProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid Props')

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
      const body: InviteRevokedProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid Props')

      const data = await resend.emails.send({
        from: 'no-reply@unlvgatekeeper.com',
        to: [query.to],
        subject: 'Invite Revoked',
        react: InviteRevoked({ ...body }),
      })

      console.log('data from email:', data)

      return NextResponse.json(data, { status: 200 })
    }

    if (query.template === 'event-changes') {
      const body: EventChangesProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid Props')

      const data = await resend.emails.send({
        from: 'no-reply@unlvgatekeeper.com',
        to: [query.to],
        subject: 'Event Changes',
        react: EventChanges({ ...body }),
      })

      console.log('data from email:', data)

      return NextResponse.json(data, { status: 200 })
    }

    if (query.template === 'event-canceled') {
      const body: EventCanceledProps = await req.json()
      console.log('/api/email POST:', body)

      if (!body) throw new Error('Invalid Props')

      const data = await resend.emails.send({
        from: 'no-reply@unlvgatekeeper.com',
        to: [query.to],
        subject: 'Event Canceled',
        react: EventCanceled({ ...body }),
      })

      console.log('data from email:', data)

      return NextResponse.json(data, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}
