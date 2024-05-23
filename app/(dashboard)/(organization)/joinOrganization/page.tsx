'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Pagination from '@/components/Common/Pagination'
import PageWrapper from '@/components/Common/PageWrapper'
import JoinOrganizationTable from '@/components/Organization/Preview/JoinOrganizationTable'
import { tableDisplayCount } from '@/data/displayCount'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'
import { LockOpenIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import FormSubmitButton from '@/components/Common/Button/FormSubmitButton'
import Modal from '@/components/Common/Modal/Modal'
import Loader from '@/components/State/Loader'
import { useAuth } from '@clerk/nextjs'
import CornerNotification from '@/components/Notification/CornerNotification'

export default function JoinOrganization() {
  const { userId } = useAuth()

  const [notificationIsOpen, setNotificationIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const [isLoadingVerification, setIsLoadingVerification] = useState(false)
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [allOrganizationsCount, setAllOrganizationsCount] = useState(0)
  const endpoint = `/api/organization`

  const [queries, setQueries] = useState<OrganizationQueryOptions>({
    search: '',
    skip: '0',
    take: String(tableDisplayCount.default),
    isPublic: 'true',
  })

  useWindowResize(
    widthBreakpoints.sm,
    () => {
      setQueries((prev) => ({ ...prev, take: String(tableDisplayCount.default) }))
    },
    () => {
      setQueries((prev) => ({ ...prev, take: String(tableDisplayCount.mobile) }))
    }
  )

  useLoadFilteredData({
    onDataLoaded: (data) => {
      setAllOrganizationsCount((data as OrganizationsPreviewResponse).allOrganizationsCount || 0)
      setOrganizations((data as OrganizationsPreviewResponse).organizations || [])
    },
    endpoint,
    queries,
    setIsLoading: setIsLoadingOrganizations,
    delay: 500,
  })

  async function validateCode() {
    try {
      setIsLoadingVerification(true)
      setIsInvalidCode(false)

      console.log('code:', code)

      const res = await fetch(`/api/organization?userId=${userId}&joinCode=${code}`, {
        method: 'PUT',
      })

      const org = await res.json()

      if (org) {
        setNotificationIsOpen(true)
      } else {
        setIsInvalidCode(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingVerification(false)
    }
  }

  return (
    <>
      <PageWrapper title="Join Organization" description="Description placeholder">
        <div className="sm:flex sm:space-x-6">
          <button
            className="flex w-full place-items-center justify-center rounded-lg bg-gray-600 text-sm text-gray-200 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 sm:w-1/2"
            onClick={() => setModalIsOpen(true)}
          >
            <div className="relative flex">
              <LockOpenIcon className="absolute -left-8 h-5 w-5" />
              <p className="font-semibold">Enter private organization code</p>
            </div>
          </button>
          <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
            <SearchBar
              onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))}
              label="Search by title or location"
            />
          </div>
        </div>

        <div className="py-4">
          <JoinOrganizationTable
            isLoadingOrganizations={isLoadingOrganizations}
            organizations={organizations}
            displayCount={Number(queries.take)}
          />
        </div>

        <Pagination
          itemsCount={organizations.length}
          allItemsCount={allOrganizationsCount}
          displayCount={Number(queries.take)}
          skips={Number(queries.skip)}
          onChange={(skip) => setQueries((prev) => ({ ...prev, skip: String(skip) }))}
        />
      </PageWrapper>

      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false)

          setTimeout(() => {
            setCode('')
            setIsInvalidCode(false)
          }, 350)
        }}
        width="sm:max-w-lg max-w-xs"
      >
        <form
          className="relative p-6"
          onSubmit={async (ev) => {
            ev.preventDefault()
            await validateCode()
          }}
        >
          <p className="flex justify-center pb-4 pt-4 font-medium text-gray-600 sm:pt-0 sm:text-lg">Enter join code</p>
          <div className="flex justify-center pb-4">
            <input
              type="text"
              className="h-10 w-full rounded-lg border px-4 text-center text-lg placeholder-gray-300"
              placeholder="xxxx-xxxx-xxxx"
              value={code}
              onChange={(ev) => setCode(ev.target.value)}
            />
          </div>
          <FormSubmitButton isDisabled={code.length != 14} text="Confirm" />
          {isInvalidCode && (
            <p className="mt-5 rounded-full bg-red-100 px-4 py-3 text-center text-sm font-medium text-red-800">
              Invalid join code
            </p>
          )}
        </form>
        <Loader isLoading={isLoadingVerification} />
      </Modal>

      <CornerNotification
        isOpen={notificationIsOpen}
        onClose={() => setNotificationIsOpen(false)}
        type="success"
        label="Success"
      >
        Organization successfully joined!
      </CornerNotification>
    </>
  )
}
