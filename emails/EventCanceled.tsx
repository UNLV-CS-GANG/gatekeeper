import EventCanceledProps from '@/types/email/EventCanceledProps'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

export default function EventCanceled({ username, title, reason }: EventCanceledProps) {
  return (
    <Html>
      <Head />
      <Preview>{title} was canceled</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-[3rem] w-[30rem] rounded-xl border border-solid border-[#eaeaea] bg-white p-[2rem]">
            <Section className="mt-[1rem]">
              {/* placeholder for logo */}
              <Img src="https://placekitten.com/200/200" width="40" height="37" alt="Vercel" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>{title}</strong> was canceled
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hey {username},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              The event you were invited to, <strong>{title}</strong>, has been canceled by the host. They provided the
              following message:
            </Text>
            <Text className="rounded-xl bg-gray-100 p-2 text-[14px] leading-[24px] text-black">
              {'"'}
              {reason}
              {'"'}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              ipsum elonasd fasdfasdfji afdslkasoefjesiljf asdfaosek asdfoae koakosfef asodjf temporary placeholder text
              for some footer info
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
