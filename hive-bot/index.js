require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const HiveManager = require('./managers/HiveManager');
const CommandHandler = require('./commands/CommandHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

const hiveManager = new HiveManager();
const commandHandler = new CommandHandler(client, hiveManager);

client.once('ready', () => {
  console.log(`✓ Bot logged in as ${client.user.tag}`);
  client.user.setActivity('Hive Server', { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  try {
    await commandHandler.handle(commandName, message, args);
  } catch (error) {
    console.error('Command error:', error);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`An error occurred: ${error.message}`)
      ]
    }).catch(console.error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  
  await commandHandler.handleButton(interaction);
});

client.login(process.env.DISCORD_TOKEN);
