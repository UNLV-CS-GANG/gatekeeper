import Pusher from 'pusher'

let pusherInstance: Pusher | null = null

function getPusherInstance() {
  if (!pusherInstance) {
    // If no instance exists, create a new one
    pusherInstance = new Pusher({
      appId: String(process.env.NEXT_PUBLIC_PUSHER_APP_ID),
      key: String(process.env.NEXT_PUBLIC_PUSHER_KEY),
      secret: String(process.env.NEXT_PUBLIC_PUSHER_SECRET),
      cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
      useTLS: true,
    })
  }

  return pusherInstance
}

export const pusher = getPusherInstance()
