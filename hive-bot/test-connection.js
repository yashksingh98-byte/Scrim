// Test script to verify Hive server connection
require('dotenv').config();
const HiveManager = require('./managers/HiveManager');

async function testConnection() {
  console.log('🧪 Testing Hive Bot Connection...\n');

  const hiveManager = new HiveManager();

  // Set up event listeners
  hiveManager.on('connected', (data) => {
    console.log(`✓ Connected as: ${data.username}`);
  });

  hiveManager.on('login', () => {
    console.log('✓ Login event received');
  });

  hiveManager.on('spawn', () => {
    console.log('✓ Spawn event received');
  });

  hiveManager.on('error', (error) => {
    console.error('❌ Error:', error.message);
  });

  hiveManager.on('disconnected', () => {
    console.log('👋 Disconnected from server');
  });

  // Attempt connection
  console.log('Attempting to connect with credentials from .env...\n');
  
  const connected = await hiveManager.connect(
    process.env.MINECRAFT_EMAIL,
    process.env.MINECRAFT_PASSWORD
  );

  if (connected) {
    console.log('\n✓✓✓ Connection successful! ✓✓✓');
    console.log('Bot is ready to use Discord commands.\n');

    // Keep connection open for 30 seconds for testing
    console.log('Connection will stay open for 30 seconds...');
    setTimeout(() => {
      console.log('\nClosing connection...');
      hiveManager.disconnect();
      process.exit(0);
    }, 30000);
  } else {
    console.log('\n❌ Connection failed. Check your .env credentials.');
    process.exit(1);
  }
}

testConnection().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
