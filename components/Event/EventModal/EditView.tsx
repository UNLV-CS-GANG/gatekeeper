'use client'

import ModalFooter from '@/components/ModalFooter'
import Loader from '@/components/State/Loader'
import { FieldValues, useForm } from 'react-hook-form'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function EditView({
  event,
  setView,
  setModalIsOpen,
  setIsLoading,
  isLoading,
  reload,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  reload: () => void
}) {
  function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const { register, handleSubmit } = useForm()
  const descMaxLength = 200
  const [tempTitle, setTempTitle] = useState(event.title)
  const [tempDesc, setTempDesc] = useState(event.description as string)
  const [tempLoc, setTempLoc] = useState(event.location)
  const [tempAccessDate, setTempAccessDate] = useState(
    formatDate(new Date(event.accessStart))
  )
  const [tempAccessStart, setTempAccessStart] = useState(
    formatTime(new Date(event.accessStart))
  )
  const [tempAccessEnd, setTempAccessEnd] = useState(
    formatTime(new Date(event.accessEnd))
  )
  const [changeOccurred, setChangeOccurred] = useState(false)

  useEffect(() => {
    if (
      tempTitle !== event.title ||
      tempDesc !== event.description ||
      tempLoc !== event.location ||
      tempAccessDate !== formatDate(new Date(event.accessStart)) ||
      tempAccessStart !== formatTime(new Date(event.accessStart)) ||
      tempAccessEnd !== formatTime(new Date(event.accessEnd))
    ) {
      setChangeOccurred(true)
    } else {
      setChangeOccurred(false)
    }
  }, [
    tempTitle,
    tempDesc,
    tempLoc,
    tempAccessDate,
    tempAccessStart,
    tempAccessEnd,
  ])

  async function editEvent(data: FieldValues) {
    try {
      setIsLoading(true)

      data.accessStart = new Date(tempAccessDate + ' ' + tempAccessStart)
      data.accessEnd = new Date(tempAccessDate + ' ' + tempAccessEnd)

      console.log('data to update w/:', data)

      const res = await fetch(`/api/event?id=${event.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          location: data.location,
          accessStart: data.accessStart,
          accessEnd: data.accessEnd,
        }),
      })

      const updatedEvent = await res.json()
      console.log('updated ev:', updatedEvent)

      reload()
      setModalIsOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit((data) => {
          editEvent(data)
        })}
      >
        <div className="px-7 pb-6 pt-12">
          <h1 className="flex justify-center pb-3 text-lg font-medium text-gray-500">
            Edit Event
          </h1>
          <div className="flex-col space-y-2">
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
                placeholder={event.title}
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
                className="absolute left-[0.6rem] top-3 rounded-xl bg-opacity-50 px-2 text-xs font-bold uppercase text-gray-600 backdrop-blur-md"
              >
                Description
              </label>
              <textarea
                className="h-32 w-full rounded-md border px-4 pt-8 text-gray-800"
                id="description"
                placeholder={event.description as string}
                maxLength={descMaxLength}
                {...register('description', {
                  required: false,
                  maxLength: descMaxLength,
                })}
                value={tempDesc}
                onChange={(ev) => setTempDesc(ev.target.value)}
              />
              <p className="absolute bottom-3 right-3 text-sm text-gray-500">
                {descMaxLength - (tempDesc ? tempDesc.length : 0)} characters
                left
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
                placeholder={event.location}
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

            <div className="flex w-full space-x-2">
              <div className="relative w-1/2">
                <label
                  htmlFor="access-date"
                  className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
                >
                  Access Date
                </label>
                <input
                  className="h-16 w-full cursor-pointer rounded-md border px-3 pt-6 text-gray-600"
                  type="date"
                  id="access-date"
                  value={tempAccessDate}
                  {...register('accessDate', { required: true })}
                  onChange={(ev) => setTempAccessDate(ev.target.value)}
                />
              </div>
              <div className="relative w-1/2">
                <label
                  htmlFor="access-start"
                  className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
                >
                  Access Starts
                </label>
                <input
                  className="h-16 w-full cursor-pointer rounded-md border px-3 pt-6 text-gray-600"
                  type="time"
                  id="access-start"
                  value={tempAccessStart}
                  {...register('accessStart', { required: true })}
                  onChange={(ev) => setTempAccessStart(ev.target.value)}
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
                  type="time"
                  id="access-end"
                  value={tempAccessEnd}
                  {...register('accessEnd', { required: true })}
                  onChange={(ev) => setTempAccessEnd(ev.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <ModalFooter>
          <div className="flex h-full place-items-center justify-between px-3">
            <button
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
              onClick={() => setView(EventModalView.INFO)}
            >
              Back
            </button>
            <button
              className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-700 disabled:hover:text-gray-200"
              disabled={
                isLoading ||
                !changeOccurred ||
                !tempTitle ||
                !tempLoc ||
                tempAccessStart >= tempAccessEnd
              }
              type="submit"
            >
              Confirm Changes
            </button>
          </div>
        </ModalFooter>
      </form>

      <Loader isLoading={isLoading} text="Updating" />
    </div>
  )
}
