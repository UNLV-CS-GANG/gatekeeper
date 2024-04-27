'use client'

import { useState } from 'react'
import InputGroup from '../Common/Input/InputGroup'
import InputBox from '../Common/Input/InputBox'
import Setting from '../Event/Setting'
import FormSubmitButton from '../Common/FormSubmitButton'
import BiToggle from '../Common/BiToggle'

export default function OrganizationForm() {
  const [tempTitle, setTempTitle] = useState('')
  const [parentLinkCode, setParentLinkCode] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit() {
    try {
      setIsLoading(true)

      const res = await fetch('/api/organization', {
        method: 'POST',
        body: JSON.stringify({
          title: tempTitle,
          parentLinkCode,
        }),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
              value={tempTitle}
              onChange={(ev) => setTempTitle(ev.target.value)}
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

      <FormSubmitButton text="Create Organization" width="w-full" isDisabled={isLoading || !tempTitle} />
    </form>
  )
}
