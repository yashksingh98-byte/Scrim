# Hive Discord Bot

A powerful Discord bot to manage Minecraft Bedrock Hive server and create/control CustomGames (Treasure Wars).

## Features

- ✓ Join The Hive server with your Minecraft account
- ✓ Create CustomGames servers for Treasure Wars
- ✓ Manage all game settings via Discord commands
- ✓ Invite players directly through Discord
- ✓ Real-time server status and monitoring
- ✓ Game configuration management

## Setup

### Prerequisites

- Node.js 16+ 
- Discord Bot Token
- Microsoft/Xbox Account (for Minecraft)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file with your credentials:
```
DISCORD_TOKEN=your_token
MINECRAFT_EMAIL=your_email
MINECRAFT_PASSWORD=your_password
HIVE_SERVER_ADDRESS=mco.minehive.com
HIVE_SERVER_PORT=19132
BOT_OWNER_ID=your_user_id
```

4. Start the bot:
```bash
npm start
```

## Commands

### Server Management
- `!join` - Join The Hive server
- `!status` - Check server status
- `!leave` - Disconnect from server

### CustomGames (Treasure Wars)
- `!create-cs` - Create a new CustomGames server
- `!tw-settings` - Configure Treasure Wars settings
- `!invite <username>` - Invite a player to the game
- `!start-game` - Start the game
- `!stop-game` - Stop the game
- `!game-info` - Get current game information

### Settings Configuration
- `!set-teams <number>` - Set number of teams
- `!set-players <number>` - Set players per team
- `!set-time <minutes>` - Set game duration
- `!set-difficulty <easy|normal|hard>` - Set difficulty
- `!settings-list` - View all current settings

## How It Works

1. Bot connects to Discord using your bot token
2. Bot authenticates with Minecraft using your Microsoft account
3. Bot joins The Hive server
4. You manage everything through Discord commands
5. Settings are stored and configurable in real-time

## Discord Command Structure

All commands start with `!` prefix and support text-based arguments.

Example:
```
!create-cs
!set-teams 2
!invite PlayerName
!start-game
```

## License

ISC
