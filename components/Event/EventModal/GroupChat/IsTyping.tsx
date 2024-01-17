import { useState } from 'react'

export default function IsTyping() {
  // subscribe to pusher channel

  const [users, setUsers] = useState(['stefano-rubini', 'miguel', 'marcos'])

  return (
    <>
      {users && (
        <div className="flex space-x-1 pl-1.5 pt-4 text-xs text-gray-500 sm:pt-8 sm:text-sm">
          {users.length === 1 && <p>{`${users[0]} is typing...`}</p>}
          {users.length === 2 && (
            <>
              <p>{`${users[0]}, ${users[1]} is typing...`}</p>
            </>
          )}
          {users.length > 2 && (
            <>
              <p>{`${users[0]}, ${users[1]}, +${users.length - 2} is typing...`}</p>
            </>
          )}
        </div>
      )}
    </>
  )
}
