const { EmbedBuilder } = require('discord.js');

class HelpCommand {
  async execute(message, args) {
    const helpEmbed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('🎮 Hive Bot Commands')
      .setDescription('All available commands for the Hive Discord Bot')
      .addFields(
        {
          name: '📡 Server Management',
          value: '`!join` - Join The Hive server\n`!status` - Check server status\n`!leave` - Disconnect from server'
        },
        {
          name: '⚔️ CustomGames (Treasure Wars)',
          value: '`!create-cs [name]` - Create new CustomGames\n`!invite [player]` - Invite player\n`!start-game` - Start game\n`!stop-game` - Stop game\n`!game-info` - Get game info'
        },
        {
          name: '⚙️ Settings Configuration',
          value: '`!settings-list` - View all settings\n`!set-teams [number]` - Set team count\n`!set-players [number]` - Players per team\n`!set-time [minutes]` - Game duration\n`!set-difficulty [easy|normal|hard]` - Difficulty'
        },
        {
          name: '📚 Examples',
          value: '```\n!join\n!create-cs My Treasure Wars\n!set-teams 2\n!invite PlayerName\n!start-game\n```'
        }
      )
      .setFooter({ text: 'Prefix: !' });

    await message.reply({ embeds: [helpEmbed] });
  }
}

module.exports = HelpCommand;
