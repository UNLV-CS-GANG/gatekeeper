import EventChangesProps from '@/types/email/EventChangesProps'
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

export default function EventChanges({
  title,
  titleChange,
  locationChange,
  accessDateChange,
  accessStartChange,
  accessEndChange,
  descriptionChange,
}: EventChangesProps) {
  return (
    <Html>
      <Head />
      <Preview>Event changes made</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-[3rem] w-[30rem] rounded-xl border border-solid border-[#eaeaea] bg-white p-[2rem]">
            <Section className="mt-[1rem]">
              {/* placeholder for logo */}
              <Img src="https://placekitten.com/200/200" width="40" height="37" alt="Vercel" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Changes made in
              <strong>{titleChange ? ` ${titleChange.new} (${titleChange.old})` : ` ${title}`}</strong>
            </Heading>
            <Text className="mb-2 rounded-full bg-gray-100 px-3 py-2 text-center text-[14px] text-gray-600">
              Changes made
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {titleChange && (
                <span>
                  <p className="font-semibold">Title:</p>
                  <p>
                    {titleChange.old} {' -> '}
                    {titleChange.new}
                  </p>
                </span>
              )}
              {locationChange && (
                <span>
                  <p className="font-semibold">Location:</p>
                  <p>
                    {locationChange.old} {' -> '}
                    {locationChange.new}
                  </p>
                </span>
              )}
              {accessDateChange && (
                <span>
                  <p className="font-semibold">Access date:</p>
                  <p>
                    {accessDateChange.old} {' -> '}
                    {accessDateChange.new}
                  </p>
                </span>
              )}
              {accessStartChange && (
                <span>
                  <p className="font-semibold">Access starts:</p>
                  <p>
                    {accessStartChange.old} {' -> '}
                    {accessStartChange.new}
                  </p>
                </span>
              )}
              {accessEndChange && (
                <span>
                  <p className="font-semibold">Access ends:</p>
                  <p>
                    {accessEndChange.old} {' -> '}
                    {accessEndChange.new}
                  </p>
                </span>
              )}
              {descriptionChange && (
                <span>
                  <p className="font-semibold">Description:</p>
                  <p>
                    {descriptionChange.old} {' -> '} {descriptionChange.new}
                  </p>
                </span>
              )}
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
