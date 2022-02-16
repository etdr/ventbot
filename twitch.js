import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub'


const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_ID,
  process.env.TWITCH_SECRET
)

const apiClient = new ApiClient({ authProvider })

const listener = new EventSubListener({
  apiClient,
  adapter: new ReverseProxyAdapter({
    hostName: 'acoma.tools',
    pathPrefix: 'ventsub',
    port: 80
  }),
  secret: 'dvmo5ufpnmqHyadmbVvaFXdLpwFKYoPdv2H6PzmMogUURNHfqyAKcG97FqD5'
})

await listener.listen()

export default listener