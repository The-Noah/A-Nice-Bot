# A Nice Bot Database

A very simple database for A Nice Bot using the JSON format and Express to serve it.

## Server Configurations

**A Nice Bot** requires the 'data' directory to exist, if it does not, create it. Inside is where all configurations will be stored. To create one for a server, create a new file with the filename being that of the [Discord server ID](#finding-a-discord-server-id), and the extension being `.json`.

Here is the syntax for a configuration.

```json
{
  "roles": ["Role Names", ...],
  "commandRestrictions": [
    {
      "command": "command name",
      "type": "role" or "disabled",
      "roles": ["Role Names", ...] (only if "type" is "role")
    }
    ...
  ]
}
```

And here is an example.

```json
{
  "roles": ["Gamer", "Streamer"],
  "commandRestrictions": [
    {
      "command": "quit",
      "type": "role",
      "roles": ["Owner"]
    },
    {
      "command": "clear",
      "type": "disabled"
    }
  ]
}
```

### Finding a Discord server ID

To find the ID of a Discord server, right click on the server and in the settings should appear `Copy ID`, if not go into `User Settings`, click on the `Appearance` tab and enable `Developer Mode`, then close out of settings and right-click on the server, and click `Copy ID`.