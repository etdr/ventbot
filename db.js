import { Sequelize, DataTypes } from 'sequelize'

const seq = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
})

export const GuildConfigs = seq.define('GuildConfigs', {
  guildId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notifyChannelId: {
    type: DataTypes.STRING
  },
  twitchId: {
    type: DataTypes.STRING
  }
})

await seq.sync()

export default seq