const { EmbedBuilder } = require('discord.js');

class StartGameCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    if (!this.hiveManager.currentGame) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ No Active Game')
            .setDescription('Create a CustomGame first with `!create-cs`')
        ]
      });
      return;
    }

    try {
      const game = await this.hiveManager.startGame();
      const players = game.players.map(p => `${p.name} (${p.team})`).join('\n');

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Game Started!')
            .setDescription(`Treasure Wars game is now RUNNING!`)
            .addFields(
              { name: 'Game Name', value: game.name, inline: true },
              { name: 'Status', value: 'RUNNING', inline: true },
              { name: 'Players', value: players || 'None', inline: false }
            )
            .setFooter({ text: `Use !stop-game to end the game` })
        ]
      });
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Failed to start game: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = StartGameCommand;
