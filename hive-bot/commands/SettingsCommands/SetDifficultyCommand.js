const { EmbedBuilder } = require('discord.js');

class SetDifficultyCommand {
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
            .setDescription('`!set-difficulty [easy|normal|hard]`\nExample: `!set-difficulty hard`')
        ]
      });
      return;
    }

    const difficulty = args[0].toLowerCase();
    const validDifficulties = ['easy', 'normal', 'hard'];

    if (!validDifficulties.includes(difficulty)) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Invalid Value')
            .setDescription(`Difficulty must be one of: ${validDifficulties.join(', ')}`)
        ]
      });
      return;
    }

    try {
      this.hiveManager.updateSetting('difficulty', difficulty);

      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✓ Difficulty Updated')
            .addFields(
              { name: 'New Difficulty', value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1), inline: true }
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

module.exports = SetDifficultyCommand;
