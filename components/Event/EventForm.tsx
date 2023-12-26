'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import FormSubmitButton from '../FormSubmitButton'
import { useState } from 'react'
import CornerNotification from '../Notification/CornerNotification'
import generateShortId from '@/lib/generateShortId'

export default function EventForm({ userId }: { userId: string | null }) {
  const { register, handleSubmit } = useForm()
  const [tempDesc, setTempDesc] = useState('')
  const [tempTitle, setTempTitle] = useState('')
  const [tempLoc, setTempLoc] = useState('')
  const [tempAccessDate, setTempAccessDate] = useState('')
  const [tempAccessStart, setTempAccessStart] = useState('')
  const [tempAccessEnd, setTempAccessEnd] = useState('')
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [isPostingEvent, setIsPostingEvent] = useState(false)
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
          accessStart: new Date(data.accessDate + ' ' + data.accessStart),
          accessEnd: new Date(data.accessDate + ' ' + data.accessEnd),
          verifierCode: generateShortId(),
          inviteLink: '',
          hostId: userId,
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
      setTempAccessDate('')
      setTempAccessStart('')
      setTempAccessEnd('')
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
          className="flex-col space-y-2"
        >
          <div className="relative">
            <label
              htmlFor="title"
              className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
            >
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
              className="h-32 w-full rounded-md border px-4 pt-8 text-sm text-gray-800 sm:text-base"
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
            <p className="absolute bottom-3 right-3 rounded-full p-1 text-sm text-gray-500 backdrop-blur-sm">
              {descMaxLength - tempDesc.length} characters left
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="location"
              className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
            >
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

          <div className="space-y-2 sm:flex sm:w-full sm:space-x-2 sm:space-y-0">
            <div className="relative sm:w-1/3">
              <label
                htmlFor="access-date"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                <p className="hidden sm:block">Access Date</p>
                <p className="block sm:hidden">Date</p>
              </label>
              <input
                className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-left text-sm text-gray-800 sm:text-base"
                type="date"
                id="access-date"
                value={tempAccessDate}
                {...register('accessDate', { required: true })}
                onChange={(ev) => setTempAccessDate(ev.target.value)}
              />
            </div>
            <div className="relative sm:w-1/3">
              <label
                htmlFor="access-start"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                <p className="hidden sm:block">Access Starts</p>
                <p className="block sm:hidden">Starts</p>
              </label>
              <input
                className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-left text-sm text-gray-800 sm:text-base"
                type="time"
                id="access-start"
                value={tempAccessStart}
                {...register('accessStart', { required: true })}
                onChange={(ev) => setTempAccessStart(ev.target.value)}
              />
            </div>
            <div className="relative sm:w-1/3">
              <label
                htmlFor="access-end"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                <p className="hidden sm:block">Access Expires</p>
                <p className="block sm:hidden">Expires</p>
              </label>
              <input
                className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-left text-sm text-gray-800 sm:text-base"
                type="time"
                id="access-end"
                value={tempAccessEnd}
                {...register('accessEnd', { required: true })}
                onChange={(ev) => setTempAccessEnd(ev.target.value)}
              />
            </div>
          </div>

          <FormSubmitButton
            text="Create Event"
            width="w-full"
            isDisabled={
              isPostingEvent ||
              !tempTitle ||
              !tempLoc ||
              !tempAccessDate ||
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
        <div>{event?.title}</div>
      </CornerNotification>
    </>
  )
}
