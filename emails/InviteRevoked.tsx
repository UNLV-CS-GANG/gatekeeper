import EmailInviteRevokedProps from '@/types/email/EmailInviteRevokedProps'
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

export default function InviteRevoked({
  title,
  username,
}: EmailInviteRevokedProps) {
  return (
    <Html>
      <Head />
      <Preview>Invite revoked for {title}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-[3rem] w-[30rem] rounded-xl border border-solid border-[#eaeaea] bg-white p-[2rem]">
            <Section className="mt-[1rem]">
              {/* placeholder for logo */}
              <Img
                src="https://placekitten.com/200/200"
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Invite revoked for <strong>{title}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Your invitation to <strong>{title}</strong> has been revoked. Your
              QR code will no longer give you access to the event.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              ipsum elonasd fasdfasdfji afdslkasoefjesiljf asdfaosek asdfoae
              koakosfef asodjf temporary placeholder text for some footer info
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
