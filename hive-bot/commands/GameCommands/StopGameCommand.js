const { EmbedBuilder } = require('discord.js');

class StopGameCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    if (!this.hiveManager.gameRunning) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ No Game Running')
            .setDescription('There is no active game to stop.')
        ]
      });
      return;
    }

    try {
      const game = await this.hiveManager.stopGame();

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⏹️ Game Stopped')
            .setDescription('The game has been stopped.')
            .addFields(
              { name: 'Game Name', value: game.name, inline: true },
              { name: 'Duration', value: this.calculateDuration(game.startedAt, game.endedAt), inline: true },
              { name: 'Total Players', value: String(game.players.length), inline: true }
            )
        ]
      });
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Failed to stop game: ${error.message}`)
        ]
      });
    }
  }

  calculateDuration(start, end) {
    if (!start || !end) return 'N/A';
    const duration = Math.floor((end - start) / 1000 / 60);
    return `${duration} minutes`;
  }
}

module.exports = StopGameCommand;
