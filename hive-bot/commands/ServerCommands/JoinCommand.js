const { EmbedBuilder } = require('discord.js');

class JoinCommand {
  constructor(hiveManager) {
    this.hiveManager = hiveManager;
  }

  async execute(message, args) {
    const joinEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('🎮 Joining Hive Server')
      .setDescription('Connecting to The Hive...');

    const response = await message.reply({ embeds: [joinEmbed] });

    try {
      const result = await this.hiveManager.connect(
        process.env.MINECRAFT_EMAIL,
        process.env.MINECRAFT_PASSWORD
      );

      if (result) {
        await response.edit({
          embeds: [
            new EmbedBuilder()
              .setColor('#00FF00')
              .setTitle('✓ Connected to Hive')
              .setDescription('Successfully joined The Hive server!')
              .addFields(
                { name: 'Server', value: 'The Hive (Bedrock)', inline: true },
                { name: 'Status', value: 'Connected', inline: true },
                { name: 'Next Step', value: 'Use `!create-cs` to create a CustomGame' }
              )
          ]
        });
      } else {
        await response.edit({
          embeds: [
            new EmbedBuilder()
              .setColor('#FF0000')
              .setTitle('✗ Connection Failed')
              .setDescription('Failed to connect to The Hive server.')
              .addFields(
                { name: 'Check', value: '• Valid Microsoft account credentials?\n• Server online?\n• .env file configured?' }
              )
          ]
        });
      }
    } catch (error) {
      await response.edit({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✗ Error')
            .setDescription(`Connection error: ${error.message}`)
        ]
      });
    }
  }
}

module.exports = JoinCommand;
