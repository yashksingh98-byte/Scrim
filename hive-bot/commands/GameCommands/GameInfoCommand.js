const { EmbedBuilder } = require('discord.js');

class GameInfoCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    const gameInfo = this.hiveManager.getGameInfo();

    if (gameInfo.status === 'no_game') {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('ℹ️ No Active Game')
            .setDescription('No CustomGame is currently active. Use `!create-cs` to create one.')
        ]
      });
      return;
    }

    const playerList = gameInfo.playerList
      .map(p => `• ${p.name} - Team: ${p.team || 'Unassigned'}`)
      .join('\n') || 'No players';

    const embed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('🎮 Game Information')
      .addFields(
        { name: 'Game Name', value: gameInfo.name, inline: true },
        { name: 'Game Type', value: gameInfo.type.replace('_', ' ').toUpperCase(), inline: true },
        { name: 'Status', value: gameInfo.status.toUpperCase(), inline: true },
        { name: 'Players', value: `${gameInfo.players}/${gameInfo.maxPlayers}`, inline: true },
        { name: 'Created', value: new Date(gameInfo.createdAt).toLocaleString(), inline: true },
        { name: 'Started', value: gameInfo.startedAt ? new Date(gameInfo.startedAt).toLocaleString() : 'Not started', inline: true },
        { name: 'Player List', value: playerList }
      );

    await message.reply({ embeds: [embed] });
  }
}

module.exports = GameInfoCommand;
