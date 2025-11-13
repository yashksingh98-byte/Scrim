const { EmbedBuilder } = require('discord.js');

class StatusCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    const connected = this.hiveManager.connected;
    const gameInfo = this.hiveManager.getGameInfo();
    
    const statusEmbed = new EmbedBuilder()
      .setColor(connected ? '#00FF00' : '#FF0000')
      .setTitle('📊 Server Status')
      .addFields(
        { name: 'Connection', value: connected ? '✓ Connected' : '✗ Disconnected', inline: true },
        { name: 'Server', value: 'The Hive', inline: true },
        { name: 'Game Running', value: this.hiveManager.gameRunning ? 'Yes' : 'No', inline: true }
      );

    if (gameInfo.status !== 'no_game') {
      statusEmbed.addFields(
        { name: 'Game Name', value: gameInfo.name, inline: true },
        { name: 'Game Status', value: gameInfo.status, inline: true },
        { name: 'Players', value: `${gameInfo.players}/${gameInfo.maxPlayers}`, inline: true }
      );
    }

    await message.reply({ embeds: [statusEmbed] });
  }
}

module.exports = StatusCommand;
