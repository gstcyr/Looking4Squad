const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates  // Keeps Voice channel state up-to-date for Guild members
  ]
});

const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.commands = new Collection();


// Load events from `events` directory:
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const event = require(`./events/${file}`);
  if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
  } else {
      client.on(event.name, (...args) => event.execute(...args));
  }
}

// Load commands from `commands` directory:
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

client.login(config.token);