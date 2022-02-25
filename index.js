import 'dotenv/config'
import { Client, Intents, MessageActionRow, MessageSelectMenu } from 'discord.js'
import { compareAsc, isAfter, subMinutes } from 'date-fns'

import { GuildConfigs as GCs } from './db.js'
import { getTwUserId, getTwStreamSubs } from './twitch.js'

const intents = new Intents()
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
  Intents.FLAGS.DIRECT_MESSAGES
)

const cl = new Client({
  intents,
  allowedMentions: { parse: ['everyone'] }
})
cl.once('ready', c => console.log(`ready as ${c.user.tag}`))
cl.on('error', c => console.error(`error: ${c.error}`))



cl.on('interactionCreate', async i => {
  if (i.isCommand() && i.commandName === 'vt-select') {
    const g = i.guild
    for (let chan of g.channels.cache.values()) {
      console.log(`type: ${chan.type}   id: ${chan.id}   name: ${chan.name}`)
    }
  }
})







// cl.on('guildCreate', async g => {
cl.on('interactionCreate', async i => {
  if (!i.isCommand() || !i.commandName === 'setup-ventbot') return

  const g = i.guild
  const owner = await cl.users.fetch(g.ownerId)
  const owchan = await owner.createDM()
  
  owchan.send(`Hi ${owner.username}! I am **Ventbot** and I am here to help you work with (e)vents in the guild *${g.name}*. Right now, let's choose a channel that you want me to ping when an event starts or when you update it while it's in progress..`)

  await g.channels.fetch()
  const channels = await g.channels.cache
  const selNotifyChanOpts = channels
    .filter(chan => chan.type === 'GUILD_TEXT' && chan.name)
    .mapValues(chan => ({
      label: chan.name,
      ...(chan.topic && { description: chan.topic }),
      value: chan.id
    }))
  console.log([ ...selNotifyChanOpts.values() ])

  const selNotifyChan = new MessageActionRow()
  selNotifyChan.addComponents(
    new MessageSelectMenu()
      .setCustomId('notifyChanSelect')
      .setPlaceholder('Select a channel...')
      .addOptions([ ...selNotifyChanOpts.values() ])
  )
  const selNCMessage = await owchan.send({
    content: 'What\'s the name of your notify channel?',
    components: [selNotifyChan]
  })
  const selNCResponse = await selNCMessage.awaitMessageComponent()

  await selNCResponse.reply({
    content: 'Cool!'
  })

  await owchan.send({
    content: 'And what\'s your Twitch username?'
  })

  const twNameResp = await owchan.awaitMessages({ max: 1 })

  const twUserName = twNameResp.first().content

  const twUserId = await getTwUserId(twUserName)

  await GCs.create({
    guildId: g.id,
    ownerId: owner.id,
    notifyChannelId: selNCResponse.values[0],
    twitchId: twUserId
  })

  // await selNCResponse.update({
  //   content: 'All right, you\'re all set!',
  //   components: []
  // })

  owchan.send('Ok, you\'re all set!')
})



async function twStartFunc (e) {
  console.log('stream start detected')
  console.log(e)
  const data = await GCs.findOne({
    where: { twitchId: e.broadcaster_user_id }
  })
  const g = cl.guilds.cache.get(data.guildId)
  const ses = await g.scheduledEvents.fetch()
  const fses = ses.sort((se0, se1) => compareAsc(
    se0.scheduledStartAt,
    se1.scheduledStartAt
  )).filter(se => isAfter(
    se.scheduledStartAt,
    subMinutes(new Date(), 30)
  ))
  
  if (fses.size > 0) {
    const firstUp = fses.first()
    firstUp.setStatus('ACTIVE')
    
  }

  nC = cl.channels.cache.get(data.notifyChannelId)
  everyoneId = g.roles.everyone.id
  username = cl.users.cache.get(data.ownerId).username
  
  nC.send({
    content: `Hey <@${everyoneId}>! ${username} is streaming.`
  })

}

async function twEndFunc (e) {

}



// async function twitchListen (twId) {

// }



cl.on('ready', async c => {
  c.actives = {}
  c.twSubs = {}
  for (let g of await c.guilds.fetch()) {
    const gData = await GCs.findOne({
      where: { guildId: g[0] }
    })
    c.twSubs[gData.ownerId] = await getTwStreamSubs(
      gData.twitchId,
      { startFunc: twStartFunc, endFunc: twEndFunc }  
    )
  }
})




















// cl.on('guildScheduledEventUpdate', (oldEv, ev) => {
//   console.log('old', oldEv)
//   console.log('updated', ev)
//   if (oldEv.status === 'SCHEDULED' && ev.status === 'ACTIVE') {
//     // stream/event start

//   }
//   if (oldEv.status === 'ACTIVE' && ev.status === 'ACTIVE') {
//     // info has changed while stream/event is ongoing
    
//   }
// })

// cl.on('guildScheduledEventCreate', async ev => {
//   await durr.scheduledEvents.fetch({ cache: true })
// })

// cl.on('guildScheduledEventDelete', async dev => {
//   await durr.scheduledEvents.fetch({ cache: true })
// })

await cl.login(process.env.TOKEN)



// const channels = durr.channels.cache

// console.log(channels)

// const schevents = durr.scheduledEvents.cache

// const notifyChannel = channels.find(chan => chan.name === 'ventbot-test')
// //const notifyChannelId = notifyChannel.id



