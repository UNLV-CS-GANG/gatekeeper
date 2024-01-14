import ModalFooter from '@/components/Common/ModalFooter'
import Loader from '@/components/State/Loader'
import { FieldValues, useForm } from 'react-hook-form'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EventChangesProps from '@/types/email/EventChangesProps'

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
  const [tempLoc, setTempLoc] = useState(event.location)
  const [tempDesc, setTempDesc] = useState(event.description as string)
  const [tempTitle, setTempTitle] = useState(event.title)

  const [tempAccessDate, setTempAccessDate] = useState(formatDate(new Date(event.accessStart)))
  const [tempAccessStart, setTempAccessStart] = useState(formatTime(new Date(event.accessStart)))
  const [tempAccessEnd, setTempAccessEnd] = useState(formatTime(new Date(event.accessEnd)))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempTitle, tempDesc, tempLoc, tempAccessDate, tempAccessStart, tempAccessEnd])

  async function emailAllGuests() {
    const props: EventChangesProps = {
      title: event.title,
    }

    if (tempTitle !== event.title) props.titleChange = { new: tempTitle, old: event.title }

    if (tempDesc !== event.description) {
      props.descriptionChange = {
        new: tempDesc ? tempDesc : '[Empty description]',
        old: event.description ? event.description : '[Empty description]',
      }
    }

    if (tempLoc !== event.location) props.locationChange = { new: tempLoc, old: event.location }

    if (tempAccessDate !== formatDate(new Date(event.accessStart))) {
      props.accessDateChange = {
        new: tempAccessDate,
        old: formatDate(new Date(event.accessStart)),
      }
    }

    if (tempAccessStart !== formatTime(new Date(event.accessStart))) {
      props.accessStartChange = {
        new: tempAccessStart,
        old: formatTime(new Date(event.accessStart)),
      }
    }

    if (tempAccessEnd !== formatTime(new Date(event.accessEnd))) {
      props.accessEndChange = {
        new: tempAccessEnd,
        old: formatTime(new Date(event.accessEnd)),
      }
    }

    for (const inv of event.invites) {
      console.log('emailing change to:', inv.email)

      const emailRes = await fetch(`/api/email?to=${inv?.email}&template=event-changes`, {
        method: 'POST',
        body: JSON.stringify(props),
      })

      console.log('email res:', await emailRes.json())
    }
  }

  async function editEvent(data: FieldValues) {
    try {
      setIsLoading(true)

      data.accessStart = new Date(tempAccessDate + ' ' + tempAccessStart)
      data.accessEnd   = new Date(tempAccessDate + ' ' + tempAccessEnd)

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

      await emailAllGuests()

      setModalIsOpen(false)
      reload()
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
        <div className="p-4 pt-8 sm:px-7 sm:pb-6 sm:pt-12">
          <h1 className="flex justify-center pb-3 text-lg font-medium text-gray-500">Edit Event</h1>
          <div className="flex-col space-y-2">
            <div className="relative">
              <label htmlFor="title" className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600">
                Title
              </label>
              <input
                className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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
                className="h-32 w-full rounded-md border px-4 pt-8 text-sm text-gray-800 sm:text-base"
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
              <p className="absolute bottom-3 right-3 rounded-full p-1 text-sm text-gray-500 backdrop-blur-sm">
                {descMaxLength - (tempDesc ? tempDesc.length : 0)} characters left
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
                  className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-600 sm:text-base"
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
                  className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-600 sm:text-base"
                  type="time"
                  id="access-start"
                  value={tempAccessStart}
                  {...register('accessStart', { required: true })}
                  onChange={(ev) => setTempAccessStart(ev.target.value)}
                />
              </div>
              <div className="relative sm:w-1/3">
                <label htmlFor="access-end" className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600">
                  <p className="hidden sm:block">Access Expires</p>
                  <p className="block sm:hidden">Expires</p>
                </label>
                <input
                  className="h-16 w-full cursor-pointer appearance-none rounded-md border bg-white px-3 pt-6 text-sm text-gray-800 sm:text-base"
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
              disabled={isLoading || !changeOccurred || !tempTitle || !tempLoc || tempAccessStart >= tempAccessEnd}
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
