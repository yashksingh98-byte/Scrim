const { EmbedBuilder } = require('discord.js');

class InviteCommand {
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

    if (args.length === 0) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⚠️ Usage')
            .setDescription('`!invite [player_name]`\nExample: `!invite xXProPlayer420Xx`')
        ]
      });
      return;
    }

    const playerName = args.join(' ');

    try {
      const player = await this.hiveManager.invitePlayer(playerName);
      const gameInfo = this.hiveManager.getGameInfo();

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Player Invited')
            .setDescription(`${playerName} has been invited to the game!`)
            .addFields(
              { name: 'Player', value: playerName, inline: true },
              { name: 'Status', value: 'Invited', inline: true },
              { name: 'Players in Game', value: `${gameInfo.players}/${gameInfo.maxPlayers}`, inline: true }
            )
        ]
      });
    } catch (error) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Failed to invite player: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = InviteCommand;
