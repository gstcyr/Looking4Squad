# Looking4Squad

### Getting Start

First, you'll need to create a `config.json` file with the following fields:

```json
{
    "token": "YOUR-TOKEN-HERE",
    "clientId": "YOUR-CLIENT-ID",
    "guildId": "YOUR-GUILD-ID",
    "prefix": "/",
    "permissionsInt": 277025393665,
    "DEV_MODE": true
}
```

`guildId` is optional, and is only used if `DEV_MODE` is true.
You can get `token` and `clientId` from the Discord Developer Portal.

Once your configuration file is setup, you'll need to run `yarn install` once to initialize the dependencies:

```commandline
yarn install
```

Afterwards, you can run the following to start the bot:
```commandline
node .
```

To deploy your slash commands:
```commandline
node ./deploy-commands.js
```