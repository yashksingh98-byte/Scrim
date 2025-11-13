const { EmbedBuilder } = require('discord.js');

class SetTeamsCommand {
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
            .setDescription('`!set-teams [number]`\nExample: `!set-teams 2` or `!set-teams 4`')
        ]
      });
      return;
    }

    const numTeams = parseInt(args[0]);

    if (isNaN(numTeams) || numTeams < 2 || numTeams > 16) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Invalid Value')
            .setDescription('Teams must be between 2 and 16.')
        ]
      });
      return;
    }

    try {
      this.hiveManager.updateSetting('teams', numTeams);

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Teams Updated')
            .addFields(
              { name: 'New Value', value: String(numTeams), inline: true },
              { name: 'Max Players', value: `${numTeams * this.hiveManager.gameSettings.playersPerTeam}`, inline: true }
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

module.exports = SetTeamsCommand;
