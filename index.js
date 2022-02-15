import 'dotenv/config'
const ids = {
  APPID: process.env.APPID,
  PUBKEY: process.env.PUBKEY,
  PERMISSIONS: process.env.PERMISSIONS,
  TOKEN: process.env.TOKEN
}

import sqlite3 from 'sqlite3'


import { Client, Intents } from "discord.js"

const cl = new Client({ intents: [Intents.FLAGS.GUILDS] })

cl.login(ids.TOKEN)


