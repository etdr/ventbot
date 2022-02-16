import 'dotenv/config'
import { Client, Intents } from 'discord.js'

const intents = new Intents()
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_SCHEDULED_EVENTS
)

const cl = new Client({ intents })
cl.once('ready', c => console.log(`ready as ${c.user.tag}`))
cl.on('error', c => console.error(`error: ${c.error}`))

cl.on('guildScheduledEventUpdate', (oldEv, ev) => {
  console.log('old', oldEv)
  console.log('updated', ev)
  if (oldEv.status === 'SCHEDULED' && ev.status === 'ACTIVE') {
    // stream/event start

  }
  if (oldEv.status === 'ACTIVE' && ev.status === 'ACTIVE') {
    // info has changed while stream/event is ongoing
    
  }
})

cl.on('guildScheduledEventCreate', async ev => {
  await durr.scheduledEvents.fetch({ cache: true })
})

cl.on('guildScheduledEventDelete', async dev => {
  await durr.scheduledEvents.fetch({ cache: true })
})

await cl.login(process.env.TOKEN)


const guilds = [ ...cl.guilds.cache.values() ]

const durr = guilds[0]

const channels = durr.channels.cache

const schevents = durr.scheduledEvents.cache

const notifyChannel = channels.find(chan => chan.name === 'ventbot-test')
//const notifyChannelId = notifyChannel.id




