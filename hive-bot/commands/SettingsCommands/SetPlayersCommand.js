const { EmbedBuilder } = require('discord.js');

class SetPlayersCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    if (args.length === 0) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⚠️ Usage')
            .setDescription('`!set-players [number]`\nExample: `!set-players 4` or `!set-players 2`')
        ]
      });
      return;
    }

    const numPlayers = parseInt(args[0]);

    if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 8) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Invalid Value')
            .setDescription('Players per team must be between 1 and 8.')
        ]
      });
      return;
    }

    try {
      this.hiveManager.updateSetting('playersPerTeam', numPlayers);

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Players Per Team Updated')
            .addFields(
              { name: 'New Value', value: String(numPlayers), inline: true },
              { name: 'Max Players', value: `${this.hiveManager.gameSettings.teams * numPlayers}`, inline: true }
            )
        ]
      });
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Failed to update setting: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = SetPlayersCommand;
