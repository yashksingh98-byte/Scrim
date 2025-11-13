const { EmbedBuilder } = require('discord.js');

class SettingsCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    const settings = this.hiveManager.getSettings();

    const embed = new EmbedBuilder()
      .setColor('#9370DB')
      .setTitle('⚙️ Current Settings')
      .addFields(
        { name: 'Teams', value: String(settings.teams), inline: true },
        { name: 'Players per Team', value: String(settings.playersPerTeam), inline: true },
        { name: 'Game Duration', value: `${settings.gameDuration} minutes`, inline: true },
        { name: 'Difficulty', value: settings.difficulty, inline: true },
        { name: 'PvP Enabled', value: settings.pvpEnabled ? 'Yes' : 'No', inline: true },
        { name: 'Drop Items', value: settings.dropItems ? 'Yes' : 'No', inline: true },
        { name: 'Respawn Enabled', value: settings.respawnEnabled ? 'Yes' : 'No', inline: true },
        { name: 'Treasure Protection', value: settings.treasureProtection ? 'Yes' : 'No', inline: true },
        { name: 'Resource Multiplier', value: String(settings.resourceMultiplier), inline: true },
        { name: 'Map', value: settings.map, inline: true },
        { name: 'Start Items', value: settings.startItems.join(', '), inline: false }
      )
      .setFooter({ text: 'Use !set-[setting] to change values' });

    await message.reply({ embeds: [embed] });
  }
}

module.exports = SettingsCommand;
