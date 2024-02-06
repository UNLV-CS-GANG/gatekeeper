import Pusher from 'pusher-js'

let pusherInstance: Pusher | null = null

function getPusherInstance() {
  if (!pusherInstance) {
    // If no instance exists, create a new one
    pusherInstance = new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
      cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
    })
  }

  return pusherInstance
}

export const pusher = getPusherInstance()
