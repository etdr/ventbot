import 'dotenv/config'
import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub'

import { GuildConfigs } from './db.js'

const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_ID,
  process.env.TWITCH_SECRET
)

const api = new ApiClient({ authProvider })

export async function getTwUserId (twName) {
  const twUser = await api.users.getUserByName(twName)
  return twUser.id
}


const listener = new EventSubListener({
  apiClient: api,
  adapter: new ReverseProxyAdapter({
    hostName: 'ventbot.computer.navy',
    port: process.env.ADAPTER_PORT
  }),
  secret: process.env.VENTSUB_SECRET
})

await listener.listen()

export async function getTwStreamSubs (twUserId, funcs) {
  try {
    console.log(`getting twitch subscriptions for ${twUserId}`)
    // const twUserId = (await GuildConfigs.findOne({
    //   where: { ownerId: dscUserId }
    // })).id
    return {
      startSub: await listener.subscribeToStreamOnlineEvents(
        twUserId,
        funcs.startFunc
      ),
      endSub: await listener.subscribeToStreamOfflineEvents(
        twUserId,
        funcs.endFunc
      )
    }
  } catch (e) {
    console.error(e)
  }
}


export default listener
