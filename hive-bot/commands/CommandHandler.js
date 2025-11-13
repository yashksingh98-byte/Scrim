const { EmbedBuilder } = require('discord.js');
const JoinCommand = require('./ServerCommands/JoinCommand');
const StatusCommand = require('./ServerCommands/StatusCommand');
const LeaveCommand = require('./ServerCommands/LeaveCommand');
const CreateCSCommand = require('./GameCommands/CreateCSCommand');
const InviteCommand = require('./GameCommands/InviteCommand');
const StartGameCommand = require('./GameCommands/StartGameCommand');
const StopGameCommand = require('./GameCommands/StopGameCommand');
const GameInfoCommand = require('./GameCommands/GameInfoCommand');
const SettingsCommand = require('./SettingsCommands/SettingsCommand');
const SetTeamsCommand = require('./SettingsCommands/SetTeamsCommand');
const SetPlayersCommand = require('./SettingsCommands/SetPlayersCommand');
const SetTimeCommand = require('./SettingsCommands/SetTimeCommand');
const SetDifficultyCommand = require('./SettingsCommands/SetDifficultyCommand');
const HelpCommand = require('./HelpCommand');

class CommandHandler {
  constructor(client, hiveManager) {
    this.client = client;
    this.hiveManager = hiveManager;
    this.commands = new Map();
    this.registerCommands();
  }

  registerCommands() {
    // Server Commands
    this.commands.set('join', new JoinCommand(this.hiveManager));
    this.commands.set('status', new StatusCommand(this.hiveManager));
    this.commands.set('leave', new LeaveCommand(this.hiveManager));

    // CustomGames Commands
    this.commands.set('create-cs', new CreateCSCommand(this.hiveManager));
    this.commands.set('invite', new InviteCommand(this.hiveManager));
    this.commands.set('start-game', new StartGameCommand(this.hiveManager));
    this.commands.set('stop-game', new StopGameCommand(this.hiveManager));
    this.commands.set('game-info', new GameInfoCommand(this.hiveManager));

    // Settings Commands
    this.commands.set('settings-list', new SettingsCommand(this.hiveManager));
    this.commands.set('set-teams', new SetTeamsCommand(this.hiveManager));
    this.commands.set('set-players', new SetPlayersCommand(this.hiveManager));
    this.commands.set('set-time', new SetTimeCommand(this.hiveManager));
    this.commands.set('set-difficulty', new SetDifficultyCommand(this.hiveManager));

    // Help Command
    this.commands.set('help', new HelpCommand());
  }

  async handle(commandName, message, args) {
    const command = this.commands.get(commandName);

    if (!command) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('Unknown Command')
            .setDescription(`Command \`${commandName}\` not found. Use \`!help\` for available commands.`)
        ]
      });
      return;
    }

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Command Error')
            .setDescription(`Failed to execute command: ${error.message}`)
        ]
      });
    }
  }

  async handleButton(interaction) {
    // Handle button interactions here if needed
    await interaction.deferReply().catch(console.error);
  }
}

module.exports = CommandHandler;
