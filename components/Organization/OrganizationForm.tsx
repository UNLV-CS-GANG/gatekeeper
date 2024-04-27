'use client'

import { useState } from 'react'
import InputGroup from '../Common/Input/InputGroup'
import InputBox from '../Common/Input/InputBox'
import Setting from '../Common/Input/Setting'
import FormSubmitButton from '../Common/Button/FormSubmitButton'
import BiToggle from '../Common/Input/BiToggle'
import { CreateOrganizationBody } from '@/types/Organization/CreateOrganizationBody'
import { useAuth } from '@clerk/nextjs'
import CornerNotification from '../Notification/CornerNotification'

export default function OrganizationForm() {
  const { userId } = useAuth()

  const [tempName, setTempName] = useState('')
  const [parentLinkCode, setParentLinkCode] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [createdOrgName, setCreatedOrgName] = useState('')
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)

  async function onSubmit() {
    try {
      setIsLoading(true)

      const res = await fetch('/api/organization', {
        method: 'POST',
        body: JSON.stringify({
          name: tempName,
          ownerId: userId,
          parentLinkCode,
          isPrivate,
        } as CreateOrganizationBody),
      })

      // notify on successful organization creation
      const org = await res.json()
      setCreatedOrgName(org.name)
      setNotificationIsOpen(true)

      // reset inputs
      setTempName('')
      setParentLinkCode('')
      setIsPrivate(true)
    } catch (err) {
      console.error(err)
      // TODO: on error, add CornerNotification
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <InputGroup label="Details">
            <InputBox label="name">
              <input
                className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800"
                type="text"
                placeholder="Organization name"
                maxLength={24}
                minLength={4}
                value={tempName}
                onChange={(ev) => setTempName(ev.target.value)}
              />
            </InputBox>
          </InputGroup>
        </div>
        <div>
          <InputGroup label="settings">
            <Setting title="Visibility" description="">
              <div className="space-y-5 text-sm">
                <div className="space-y-2">
                  <div>
                    <label className="font-semibold text-gray-600">Public Organization</label>
                    <p className="text-gray-500">Any user can join this organization.</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Private Organization</label>
                    <p className="text-gray-500">Users must enter a code before joining.</p>
                  </div>
                </div>

                <BiToggle
                  rightEnabled={isPrivate}
                  setRightEnabled={setIsPrivate}
                  leftLabel="Public"
                  rightLabel="Private"
                />
              </div>
            </Setting>
            <Setting
              title="Parent organization"
              description="Do you want to create this organization under a bigger one? Get the organization's link-code and insert it here."
            >
              <input
                className="h-8 w-36 rounded-lg bg-gray-100 text-center text-sm text-gray-700"
                type="text"
                placeholder="xxxx-xxxx-xxxx"
                value={parentLinkCode}
                onChange={(ev) => setParentLinkCode(ev.target.value)}
              />
            </Setting>
          </InputGroup>
        </div>

        <FormSubmitButton text="Create Organization" width="w-full" isDisabled={isLoading || !tempName} />
      </form>

      <CornerNotification
        isOpen={notificationIsOpen}
        type="success"
        label="Organization created!"
        onClose={() => setNotificationIsOpen(false)}
      >
        <span>{createdOrgName}</span>
      </CornerNotification>
    </>
  )
}
