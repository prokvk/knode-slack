knode-slack
===========

is a node module wrapper on [node-slack-sdk](https://github.com/slackapi/node-slack-sdk).

It exposes 3 methods + `message` helper library. The exposed properties are:

- `postMessage` - post a message to channel / user (you can post only to channels your bot has joined)
- `getChannels` - get all channels info
- `getUsers` - get all users info
- `message` - helper library

# Usage

## getChannels CoffeeScript sample

```coffeescript
ks = require('knode-slack') {bot_token: 'YOUR_BOT_TOKEN_HERE'}

ks.getChannels (err, channels) ->
	console.log "ERROR: #{err}" if err
	console.log channels unless err
```

## getUsers CoffeeScript sample

```coffeescript
ks = require('knode-slack') {bot_token: 'YOUR_BOT_TOKEN_HERE'}

ks.getUsers (err, users) ->
	console.log "ERROR: #{err}" if err
	console.log users unless err
```

## postMessage CoffeeScript sample

```coffeescript
ks = require('knode-slack') {bot_token: 'YOUR_BOT_TOKEN_HERE'}

attachments =
	[
		{
			title: 'sample title'
			text: "sample text"
			color: "good"
		}
	]

ks.postMessage ['@USER1','@USER2','CHANNEL1','CHANNEL2'], 'subject', 'message', attachments, (err, res) ->
	console.log "ERROR: #{err}" if err
```

`attachments` is an array of objects - see here - https://api.slack.com/docs/message-attachments
There are 3 basic colors - `good` (green), `warning` (yellow) and `danger` (red), also a hex color code can be used (eg. `#439FE0`)
Sample attachment array with 1 object with green color:

```coffeescript
[
	{
		title: 'sample title'
		text: "sample text"
		color: "good"
	}
]
```

To allow slack markdown in attachments set the `mrkdwn_in` array with fields markdown should apply to. Look at sample with markdown allowed in `text`:

```coffeescript
[
	{
		title: 'sample title'
		text: "sample text *with* markdown"
		color: "good"
		mrkdwn_in: ['text']
	}
]
```

To add fields to attachment set the fields array, like in sample below:

```coffeescript
[
	{
		title: 'sample title'
		text: "sample text *with* markdown"
		color: "good"
		mrkdwn_in: ['text']
		fields: [
			{title: 'Project', value: 'Cool API', short: true}
			{title: 'Environment', value: 'dev', short: true}
		]
	}
]
```

Notice the optional `short` key in fields object. If set to true it will display these fields in a table instead of under each other.
