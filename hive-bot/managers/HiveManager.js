const { Authflow } = require('prismarine-auth');
const { createClient } = require('minecraft-protocol');

class HiveManager {
  constructor() {
    this.client = null;
    this.connected = false;
    this.authflow = null;
    this.gameSettings = {
      teams: 2,
      playersPerTeam: 4,
      gameDuration: 30,
      difficulty: 'normal',
      pvpEnabled: true,
      dropItems: true,
      respawnEnabled: true,
      treasureProtection: true,
      resourceMultiplier: 1.0,
      startItems: ['wooden_sword', 'wooden_pickaxe', 'stone_axe'],
      map: 'default'
    };
    this.players = new Map();
    this.gameRunning = false;
    this.currentGame = null;
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }

  async connect(email, password) {
    try {
      console.log('🔐 Authenticating with Microsoft...');
      
      // Create authentication flow
      this.authflow = new Authflow(email, '.minecraft_auth');
      
      // Get Xbox Live token
      const xboxLiveToken = await this.authflow.getXboxToken();
      console.log('✓ Xbox authentication successful');

      // Get Minecraft profile
      const mcProfile = await this.authflow.getMcProfile();
      console.log(`✓ Logged in as: ${mcProfile.name}`);

      // Connect to Hive server
      console.log('🎮 Connecting to Hive server...');
      
      this.client = await createClient({
        host: 'mco.minehive.com',
        port: 19132,
        username: mcProfile.name,
        auth: 'microsoft',
        profilesFolder: '.minecraft_profiles'
      });

      // Set up event listeners
      this.setupEventListeners();

      this.connected = true;
      this.emit('connected', { username: mcProfile.name });
      console.log('✓ Successfully connected to Hive server!');
      return true;

    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      this.connected = false;
      this.emit('error', error);
      return false;
    }
  }

  setupEventListeners() {
    if (!this.client) return;

    this.client.on('login', () => {
      console.log('✓ Login successful');
      this.emit('login');
    });

    this.client.on('spawn', () => {
      console.log('✓ Spawned in world');
      this.emit('spawn');
    });

    this.client.on('chat', (message) => {
      console.log(`[CHAT] ${message.toString()}`);
      this.emit('chat', message);
    });

    this.client.on('end', (reason) => {
      console.log(`Connection ended: ${reason}`);
      this.connected = false;
      this.emit('disconnected');
    });

    this.client.on('error', (error) => {
      console.error('Client error:', error);
      this.emit('error', error);
    });
  }

  async createCustomGame(name, gameType = 'treasure_wars') {
    if (!this.connected) {
      throw new Error('Not connected to server');
    }

    try {
      // Send command to Hive server to create custom game
      if (this.client && this.client.chat) {
        this.client.chat(`/customgame create ${name} ${gameType}`);
      }

      this.currentGame = {
        id: `game_${Date.now()}`,
        name: name,
        type: gameType,
        createdAt: new Date(),
        settings: { ...this.gameSettings },
        players: [],
        status: 'waiting'
      };

      this.emit('gameCreated', this.currentGame);
      console.log(`✓ CustomGame created: ${name}`);
      return this.currentGame;
    } catch (error) {
      console.error('Failed to create custom game:', error);
      throw error;
    }
  }

  updateSetting(key, value) {
    if (!(key in this.gameSettings)) {
      throw new Error(`Unknown setting: ${key}`);
    }

    const oldValue = this.gameSettings[key];
    this.gameSettings[key] = value;
    
    // Send setting to server
    if (this.client && this.client.chat) {
      this.client.chat(`/gamesetting ${key} ${value}`);
    }

    this.emit('settingChanged', { key, oldValue, newValue: value });
    console.log(`✓ Setting updated: ${key} = ${value}`);
    return true;
  }

  async invitePlayer(playerName) {
    if (!this.currentGame) {
      throw new Error('No active game');
    }

    const maxPlayers = this.gameSettings.teams * this.gameSettings.playersPerTeam;
    if (this.currentGame.players.length >= maxPlayers) {
      throw new Error(`Game is full (${maxPlayers} players)`);
    }

    const player = {
      name: playerName,
      joinedAt: new Date(),
      team: null,
      status: 'invited'
    };

    // Send invite command to server
    if (this.client && this.client.chat) {
      this.client.chat(`/invite ${playerName}`);
    }

    this.currentGame.players.push(player);
    this.players.set(playerName, player);
    this.emit('playerInvited', player);
    console.log(`✓ Player invited: ${playerName}`);
    return player;
  }

  async startGame() {
    if (!this.currentGame) {
      throw new Error('No active game');
    }

    if (this.currentGame.players.length < 2) {
      throw new Error('Need at least 2 players to start');
    }

    this.gameRunning = true;
    this.currentGame.status = 'running';
    this.currentGame.startedAt = new Date();

    // Send start command
    if (this.client && this.client.chat) {
      this.client.chat(`/startgame`);
    }

    this.assignTeams();

    this.emit('gameStarted', this.currentGame);
    console.log(`✓ Game started: ${this.currentGame.name}`);
    return this.currentGame;
  }

  assignTeams() {
    const numTeams = this.gameSettings.teams;
    const playersPerTeam = this.gameSettings.playersPerTeam;
    const players = this.currentGame.players;

    let teamIndex = 0;
    players.forEach((player, index) => {
      player.team = `Team ${teamIndex + 1}`;
      teamIndex = (teamIndex + 1) % numTeams;
    });
  }

  async stopGame() {
    if (!this.gameRunning) {
      throw new Error('No game running');
    }

    this.gameRunning = false;
    this.currentGame.status = 'stopped';
    this.currentGame.endedAt = new Date();

    // Send stop command
    if (this.client && this.client.chat) {
      this.client.chat(`/stopgame`);
    }

    this.emit('gameStopped', this.currentGame);
    console.log(`✓ Game stopped: ${this.currentGame.name}`);
    return this.currentGame;
  }

  getGameInfo() {
    if (!this.currentGame) {
      return { status: 'no_game', message: 'No active game' };
    }

    return {
      id: this.currentGame.id,
      name: this.currentGame.name,
      type: this.currentGame.type,
      status: this.currentGame.status,
      players: this.currentGame.players.length,
      maxPlayers: this.gameSettings.teams * this.gameSettings.playersPerTeam,
      settings: this.gameSettings,
      playerList: this.currentGame.players,
      createdAt: this.currentGame.createdAt,
      startedAt: this.currentGame.startedAt || null
    };
  }

  getSettings() {
    return { ...this.gameSettings };
  }

  getAllPlayers() {
    if (!this.currentGame) return [];
    return this.currentGame.players;
  }

  async disconnect() {
    try {
      if (this.client) {
        this.client.end();
      }
      this.connected = false;
      this.gameRunning = false;
      this.currentGame = null;
      this.players.clear();
      this.emit('disconnected');
      console.log('✓ Disconnected from server');
      return true;
    } catch (error) {
      console.error('Disconnect error:', error);
      return false;
    }
  }
}

module.exports = HiveManager;
