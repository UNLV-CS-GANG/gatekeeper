import QrProps from '@/types/email/QrProps'
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

export default function Qr({
  qrSrc,
  title,
  description,
  location,
  accessStart,
  accessEnd,
  username,
}: QrProps) {
  return (
    <Html>
      <Head />
      <Preview>Access for {title}</Preview>
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
              Access for <strong>{title}</strong>
              <Text className="text-[14px] text-gray-700">{location}</Text>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {description}
            </Text>
            <Section className="py-[1.5rem]">
              <Row>
                <Column align="center">
                  <Img src={qrSrc} width="320" height="320" />
                </Column>
              </Row>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              <p>Please have this QR ready to be scanned at the event.</p>
              <p>This code can only be used once and is valid from</p>
              <p>
                <strong>{accessStart}</strong> to <strong>{accessEnd}</strong>
              </p>
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
