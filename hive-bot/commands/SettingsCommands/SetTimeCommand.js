const { EmbedBuilder } = require('discord.js');

class SetTimeCommand {
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
            .setDescription('`!set-time [minutes]`\nExample: `!set-time 30` or `!set-time 60`')
        ]
      });
      return;
    }

    const time = parseInt(args[0]);

    if (isNaN(time) || time < 1 || time > 120) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Invalid Value')
            .setDescription('Game duration must be between 1 and 120 minutes.')
        ]
      });
      return;
    }

    try {
      this.hiveManager.updateSetting('gameDuration', time);

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Game Duration Updated')
            .addFields(
              { name: 'New Duration', value: `${time} minutes`, inline: true }
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

module.exports = SetTimeCommand;
