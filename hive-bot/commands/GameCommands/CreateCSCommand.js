const { EmbedBuilder } = require('discord.js');

class CreateCSCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    if (!this.hiveManager.connected) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Not Connected')
            .setDescription('Must be connected to server first. Use `!join` to connect.')
        ]
      });
      return;
    }

    const gameName = args.length > 0 ? args.join(' ') : `CustomGame_${Date.now()}`;

    try {
      const game = await this.hiveManager.createCustomGame(gameName, 'treasure_wars');

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ CustomGame Created')
            .setDescription(`Treasure Wars game created successfully!`)
            .addFields(
              { name: 'Game Name', value: gameName, inline: true },
              { name: 'Game ID', value: game.id, inline: true },
              { name: 'Type', value: 'Treasure Wars', inline: true },
              { name: 'Status', value: 'Waiting', inline: true },
              { name: 'Max Players', value: `${this.hiveManager.gameSettings.teams * this.hiveManager.gameSettings.playersPerTeam}`, inline: true },
              { name: 'Next', value: 'Use `!invite [player]` to add players\nUse `!start-game` to start' }
            )
        ]
      });
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Failed to create CustomGame: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = CreateCSCommand;
