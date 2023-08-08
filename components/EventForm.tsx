'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import RouteButton from './RouteButton'

type EventFormProps = {
  postEvent: (event: Event) => Promise<void> 
  userId: string | null
}

export default function EventForm({ postEvent, userId }: EventFormProps) {
  const { register, handleSubmit } = useForm()

  const temp_verifierCode = 'abc123'

  function onSubmit(data: FieldValues) {
    postEvent({
      title: data.title,
      location: data.location,
      accessStart: new Date(data.accessStart),
      accessEnd: new Date(data.accessEnd),
      inviteLink: '',
      verifierCode: temp_verifierCode,
      hostId: userId,
    } as Event)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
        })}
      >
        <div className='flex justify-between'>
          <label htmlFor="title" className=''>Title:</label>
          <input
            className="text-black ring-1 ring-gray-300"
            type="text"
            id="title"
            {...register('title', { required: true, maxLength: 24 })}
          />
        </div>

        <div className='flex justify-between'>
          <label htmlFor="location">Location:</label>
          <input
            className="text-black ring-1 ring-gray-300"
            type="text"
            id="location"
            {...register('location', { required: true, maxLength: 60 })}
          />
        </div>

        <div className=''>
          <div className='flex justify-between'>
            <p >Invite access:</p> 
            <p>Access placeholder</p>
          </div>
          <div className='flex justify-between'>
            <label htmlFor="access-start">Access Start:</label>
            <input
              className="text-black"
              type="datetime-local"
              id="access-start"
              {...register('accessStart', { required: true })}
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="access-end" className='pr-14'>Access Expires:</label>
            <input
              className="text-black"
              type="datetime-local"
              id="access-end"
              {...register('accessEnd', { required: true })}
            />
          </div>
        </div>

        <div className='flex justify-between mt-8'>
          <button type="submit" className='ring-1 rounded-md py-2 px-4 ring-gray-300'>Create</button>
          <RouteButton route="/">Back</RouteButton>
        </div>
      </form>
    </div>
  )
}
