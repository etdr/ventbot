import 'dotenv/config'

import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

const commands = [
	new SlashCommandBuilder().setName('setup-ventbot').setDescription('set up your new ventbot'),
  new SlashCommandBuilder().setName('vt-select').setDescription('selection test')
]
	.map(cmd => cmd.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

try {
  await rest.put(Routes.applicationGuildCommands(process.env.APPID, '935955067562000414'), { body: commands })
  console.log('Successfully registered application commands.')
} catch (e) {
  console.error(e)
}