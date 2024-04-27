'use client'

import Toggle from '@/components/Common/Toggle'
import FormSubmitButton from '@/components/Common/FormSubmitButton'
import CornerNotification from '@/components/Notification/CornerNotification'
import generateCode from '@/lib/generateCode'
import Setting from './Setting'
import { Event } from '@prisma/client'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { FieldValues, useForm } from 'react-hook-form'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import InputGroup from '../Common/Input/InputGroup'
import InputBox from '../Common/Input/InputBox'

export default function EventForm() {
  const { userId } = useAuth()
  const { register, handleSubmit } = useForm()

  const [useCap, setUseCap] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [tempLoc, setTempLoc] = useState('')
  const [tempDesc, setTempDesc] = useState('')
  const [tempTitle, setTempTitle] = useState('')
  const [tempCap, setTempCap] = useState(25)
  const [isPostingEvent, setIsPostingEvent] = useState(false)
  const [tempAccessStart, setTempAccessStart] = useState('')
  const [tempAccessEnd, setTempAccessEnd] = useState('')
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)

  const descMaxLength = 200

  async function onSubmit(data: FieldValues) {
    try {
      setIsPostingEvent(true)

      const res = await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          location: data.location,
          accessStart: new Date(data.accessStart),
          accessEnd: new Date(data.accessEnd),
          verifierCode: generateCode(),
          capacity: useCap ? tempCap : null,
          inviteLink: '',
          userId,
        }),
      })

      if (!res.ok) throw Error('Bad request')

      // on successful post
      const createdEvent = await res.json()
      setEvent(createdEvent)
      setNotificationIsOpen(true)
      console.log('Successful post:', createdEvent)

      // reset inputs
      setTempTitle('')
      setTempDesc('')
      setTempLoc('')
      setTempAccessStart('')
      setTempAccessEnd('')
      setUseCap(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsPostingEvent(false)
    }
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data)
          })}
          className="flex-col space-y-4"
        >
          <div>
            <InputGroup label="Details">
              <InputBox label="title">
                <input
                  className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800"
                  type="text"
                  id="title"
                  placeholder="My title"
                  maxLength={24}
                  minLength={4}
                  value={tempTitle}
                  {...register('title', {
                    required: true,
                    maxLength: 24,
                    minLength: 4,
                  })}
                  onChange={(ev) => setTempTitle(ev.target.value)}
                />
              </InputBox>

              <InputBox label="description">
                <textarea
                  className="-mb-1.5 h-24 w-full resize-none rounded-md border px-4 pt-8 text-sm text-gray-800 sm:h-32"
                  id="description"
                  placeholder="My description"
                  maxLength={descMaxLength}
                  {...register('description', {
                    required: false,
                    maxLength: descMaxLength,
                  })}
                  value={tempDesc}
                  onChange={(ev) => setTempDesc(ev.target.value)}
                />
                <p className="absolute bottom-1 right-3 rounded-full p-1 text-sm text-gray-500 backdrop-blur-sm">
                  {descMaxLength - tempDesc.length} characters left
                </p>
              </InputBox>

              <InputBox label="location">
                <input
                  className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800"
                  type="text"
                  id="location"
                  placeholder="My location"
                  maxLength={60}
                  minLength={4}
                  value={tempLoc}
                  {...register('location', {
                    required: true,
                    maxLength: 60,
                    minLength: 4,
                  })}
                  onChange={(ev) => setTempLoc(ev.target.value)}
                />
              </InputBox>
            </InputGroup>
          </div>

          <div>
            <InputGroup label="Date and time">
              <div className="sm:flex sm:w-full sm:space-x-0.5 sm:space-y-0">
                <div className="sm:w-1/2">
                  <InputBox label="starts">
                    <input
                      className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-800"
                      type="datetime-local"
                      id="access-start"
                      value={tempAccessStart}
                      {...register('accessStart', { required: true })}
                      onChange={(ev) => setTempAccessStart(ev.target.value)}
                    />
                  </InputBox>
                </div>
                <div className="sm:w-1/2">
                  <InputBox label="expires">
                    <input
                      className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-800"
                      type="datetime-local"
                      id="access-end"
                      value={tempAccessEnd}
                      {...register('accessEnd', { required: true })}
                      onChange={(ev) => setTempAccessEnd(ev.target.value)}
                    />
                  </InputBox>
                </div>
              </div>
            </InputGroup>
          </div>

          <div>
            <InputGroup label="Settings">
              <Setting
                title="Guest capacity"
                description="Maximum amount of users that can accept an invite to this event."
              >
                <div className="flex place-items-center space-x-3">
                  <Toggle enabled={useCap} setEnabled={setUseCap} />
                  <div className="relative flex place-items-center justify-center">
                    {!useCap && (
                      <div className="absolute mx-2 flex space-x-1.5 bg-gray-100">
                        <LockClosedIcon className="h-5 w-5 text-gray-800" />
                        <p className="text-sm text-gray-700">None</p>
                      </div>
                    )}
                    <input
                      className="h-8 w-24 rounded-lg bg-gray-100 text-center text-sm text-gray-700"
                      type="number"
                      disabled={!useCap}
                      value={tempCap}
                      onChange={(ev) => setTempCap(ev.target.valueAsNumber)}
                    />
                  </div>
                </div>
              </Setting>
              <Setting title="Cover image" description="Upload an image to use as the event cover.">
                {'<Image upload placeholder>'}
              </Setting>
            </InputGroup>
          </div>

          <FormSubmitButton
            text="Create Event"
            width="w-full"
            isDisabled={
              isPostingEvent ||
              !tempTitle ||
              !tempLoc ||
              !tempAccessStart ||
              !tempAccessEnd ||
              (useCap && tempCap <= 0) ||
              tempAccessStart >= tempAccessEnd
            }
          />
        </form>
      </div>

      <CornerNotification
        isOpen={notificationIsOpen}
        type="success"
        label="Event created!"
        onClose={() => setNotificationIsOpen(false)}
      >
        <span>{event?.title}</span>
      </CornerNotification>
    </>
  )
}
