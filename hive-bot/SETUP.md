# Hive Discord Bot - Setup Guide

## Project Structure

```
hive-bot/
├── index.js                           # Main bot entry point
├── package.json                       # Dependencies
├── .env                              # Configuration (credentials)
├── README.md                         # Overview
├── managers/
│   └── HiveManager.js                # Minecraft server manager
└── commands/
    ├── CommandHandler.js             # Command router
    ├── HelpCommand.js                # Help command
    ├── ServerCommands/               # Server-related commands
    │   ├── JoinCommand.js            # Join server
    │   ├── StatusCommand.js          # Check status
    │   └── LeaveCommand.js           # Disconnect
    ├── GameCommands/                 # Game management commands
    │   ├── CreateCSCommand.js        # Create CustomGame
    │   ├── InviteCommand.js          # Invite player
    │   ├── StartGameCommand.js       # Start game
    │   ├── StopGameCommand.js        # Stop game
    │   └── GameInfoCommand.js        # Game info
    └── SettingsCommands/             # Settings management
        ├── SettingsCommand.js        # List all settings
        ├── SetTeamsCommand.js        # Configure teams
        ├── SetPlayersCommand.js      # Configure players per team
        ├── SetTimeCommand.js         # Configure game duration
        └── SetDifficultyCommand.js   # Configure difficulty
```

## Installation Steps

### 1. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Go to "Bot" section and click "Add Bot"
4. Under TOKEN, click "Copy" to get your bot token
5. Go to OAuth2 > URL Generator
6. Select scopes: `bot`
7. Select permissions:
   - `Send Messages`
   - `Embed Links`
   - `Read Message History`
   - `Read Messages/View Channels`
8. Copy the generated URL and open in browser to invite bot to your server

### 2. Set Up Environment

```bash
cd /workspaces/Scrim/hive-bot
```

Edit `.env`:
```
DISCORD_TOKEN=your_bot_token_here
MINECRAFT_EMAIL=your_microsoft_account_email@outlook.com
MINECRAFT_PASSWORD=your_microsoft_account_password
HIVE_SERVER_ADDRESS=mco.minehive.com
HIVE_SERVER_PORT=19132
BOT_OWNER_ID=your_discord_user_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Bot

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Command Usage

### Connection Commands
```
!join              # Connect to Hive server
!status            # Check connection status
!leave             # Disconnect from server
```

### Game Management
```
!create-cs [name]  # Create new Treasure Wars game
!game-info         # Show current game details
!start-game        # Start the game
!stop-game         # Stop the game
```

### Player Management
```
!invite [player]   # Invite player to game
```

### Settings Configuration
```
!settings-list                    # View all settings
!set-teams [2-16]                 # Set number of teams
!set-players [1-8]                # Set players per team
!set-time [1-120]                 # Set game duration (minutes)
!set-difficulty [easy|normal|hard] # Set difficulty
```

### Help
```
!help             # Show all commands
```

## Workflow Example

1. **Join Server**
   ```
   !join
   ```

2. **Create CustomGame**
   ```
   !create-cs Epic Treasure Wars
   ```

3. **Configure Settings**
   ```
   !set-teams 2
   !set-players 4
   !set-time 30
   !set-difficulty hard
   ```

4. **Invite Players**
   ```
   !invite PlayerName1
   !invite PlayerName2
   !invite PlayerName3
   !invite PlayerName4
   ```

5. **Start Game**
   ```
   !start-game
   ```

6. **Monitor Game**
   ```
   !game-info
   !status
   ```

7. **Stop Game**
   ```
   !stop-game
   ```

## Important Notes

- **Microsoft Account Required**: You need a valid Microsoft/Xbox account to authenticate with Hive
- **Server Status**: The bot shows connection status with `!status`
- **Player Limits**: Max players = Teams × Players Per Team
- **Game Settings**: All settings can be changed dynamically via Discord
- **Error Handling**: The bot provides detailed error messages in Discord embeds

## Troubleshooting

**Bot won't connect to Hive?**
- Verify Microsoft account credentials in `.env`
- Check if Hive server is online
- Ensure network connectivity

**Commands not working?**
- Check Discord permissions (Send Messages, Embed Links)
- Verify bot token is valid
- Restart the bot

**Players won't join game?**
- Ensure game is created with `!create-cs`
- Check max player limit
- Verify Minecraft usernames are correct

## Support

For more help, use `!help` in Discord or check README.md
