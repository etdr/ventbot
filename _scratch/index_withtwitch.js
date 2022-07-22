import 'dotenv/config'
import { Client, Intents } from 'discord.js'

// import ventsub from './twitch'



const cl = new Client({ intents: [Intents.FLAGS.GUILDS] })

cl.login(ids.TOKEN)






// const streamOnSub = await ventsub.subscribeToStreamOnlineEvents(
//   process.env.SUBSCRIBEE_ID,
//   e => {

//   }
// )
