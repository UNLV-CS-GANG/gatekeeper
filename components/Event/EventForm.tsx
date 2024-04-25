'use client'

import Toggle from '@/components/Common/Toggle'
import FormSubmitButton from '@/components/Common/FormSubmitButton'
import CornerNotification from '@/components/Notification/CornerNotification'
import generateShortId from '@/lib/generateShortId'
import Setting from './Setting'
import { Event } from '@prisma/client'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { FieldValues, useForm } from 'react-hook-form'
import { LockClosedIcon } from '@heroicons/react/24/outline'

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
          verifierCode: generateShortId(),
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
          className="flex-col space-y-4 divide-gray-300"
        >
          <div>
            <label className="text-sm font-semibold text-gray-600 sm:text-base">Details</label>
            <div className="space-y-1.5 rounded-lg p-3 ring-2 ring-gray-200">
              <div className="relative">
                <label htmlFor="title" className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600">
                  Title
                </label>
                <input
                  className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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
              </div>

              <div className="relative">
                <label
                  htmlFor="description"
                  className="absolute left-[0.6rem] top-3 rounded-xl bg-opacity-50 px-2 text-xs font-bold uppercase text-gray-600 backdrop-blur-sm"
                >
                  Description
                </label>
                <textarea
                  className="-mb-1.5 h-24 w-full resize-none rounded-md border px-4 pt-8 text-sm text-gray-800 sm:h-32 sm:text-base"
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
              </div>

              <div className="relative">
                <label htmlFor="location" className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600">
                  Location
                </label>
                <input
                  className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 sm:text-base">Access date and time</label>
            <div className="space-y-1.5 rounded-lg p-3 ring-2 ring-gray-200 sm:flex sm:w-full sm:space-x-2 sm:space-y-0">
              <div className="relative sm:w-1/2">
                <label
                  htmlFor="access-start"
                  className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
                >
                  Starts
                </label>
                <input
                  className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-800 sm:text-base"
                  type="datetime-local"
                  id="access-start"
                  value={tempAccessStart}
                  {...register('accessStart', { required: true })}
                  onChange={(ev) => setTempAccessStart(ev.target.value)}
                />
              </div>
              <div className="relative sm:w-1/2">
                <label htmlFor="access-end" className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600">
                  Expires
                </label>
                <input
                  className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-800 sm:text-base"
                  type="datetime-local"
                  id="access-end"
                  value={tempAccessEnd}
                  {...register('accessEnd', { required: true })}
                  onChange={(ev) => setTempAccessEnd(ev.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 sm:text-base">Settings</label>
            <div className="space-y-1.5 rounded-lg p-3 ring-2 ring-gray-200 sm:w-full sm:space-y-1">
              <Setting
                title="Guest capacity"
                description="Maximum amount of users that can accept an invite to this event."
              >
                <div className="flex place-items-center space-x-3">
                  <Toggle enabled={useCap} setEnabled={setUseCap} />
                  <div className="relative flex place-items-center justify-center">
                    {!useCap && <LockClosedIcon className="absolute mx-2 h-5 w-5 bg-gray-100 text-gray-800" />}
                    <input
                      className="h-8 w-24 rounded-lg bg-gray-100 text-center text-gray-700"
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
            </div>
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
