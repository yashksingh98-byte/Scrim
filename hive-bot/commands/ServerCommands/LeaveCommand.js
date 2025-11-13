const { EmbedBuilder } = require('discord.js');

class LeaveCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    try {
      const result = this.hiveManager.disconnect();

      if (result) {
        await message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#FFA500')
              .setTitle('👋 Disconnected')
              .setDescription('Successfully disconnected from The Hive server.')
          ]
        });
      } else {
        throw new Error('Disconnection failed');
      }
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Disconnection error: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = LeaveCommand;
