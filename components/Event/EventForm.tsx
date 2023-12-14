'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import FormSubmitButton from '../FormSubmitButton'
import { useState } from 'react'
import CornerNotification from '../Notification/CornerNotification'

export default function EventForm({ userId }: { userId: string | null }) {
  const { register, handleSubmit } = useForm()
  const [tempDesc, setTempDesc] = useState('')
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [isPostingEvent, setIsPostingEvent] = useState(false)

  const descMaxLength = 200
  const temp_verifierCode = 'abc123'

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
          verifierCode: temp_verifierCode,
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
    } catch (err) {
      console.error('Error:', err)
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
              className="h-16 w-full rounded-md border px-4 pt-6 text-gray-800"
              type="text"
              id="title"
              placeholder="My title"
              maxLength={24}
              minLength={4}
              {...register('title', {
                required: true,
                maxLength: 24,
                minLength: 4,
              })}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="title"
              className="absolute left-[0.6rem] top-3 rounded-xl bg-opacity-50 px-2 text-xs font-bold uppercase text-gray-600 backdrop-blur-md"
            >
              Description
            </label>
            <textarea
              className="h-32 w-full rounded-md border px-4 pt-8 text-gray-800"
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
            <p className="absolute bottom-3 right-3 text-sm text-gray-500">
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
              className="h-16 w-full rounded-md border px-4 pt-6 text-gray-800"
              type="text"
              id="location"
              placeholder="My location"
              maxLength={60}
              minLength={4}
              {...register('location', {
                required: true,
                maxLength: 60,
                minLength: 4,
              })}
            />
          </div>

          <div className="flex w-full space-x-2">
            <div className="relative w-1/2">
              <label
                htmlFor="access-start"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                Access Start
              </label>
              <input
                className="h-16 w-full cursor-pointer rounded-md border px-3 pt-6 text-gray-600"
                type="datetime-local"
                id="access-start"
                {...register('accessStart', { required: true })}
              />
            </div>
            <div className="relative w-1/2">
              <label
                htmlFor="access-end"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                Access Expires
              </label>
              <input
                className="h-16 w-full cursor-pointer rounded-md border px-3 pt-6 text-gray-800"
                type="datetime-local"
                id="access-end"
                {...register('accessEnd', { required: true })}
              />
            </div>
          </div>

          <FormSubmitButton
            text="Create Event"
            width="w-full"
            isSubmitting={isPostingEvent}
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