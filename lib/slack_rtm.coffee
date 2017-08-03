module.exports = (config) ->

	RtmClient = require('@slack/client').RtmClient
	CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
	botToken = config.bot_token || ''
	rtm = new RtmClient botToken
	process.knode_slack = {channels: null, users: null}

	# The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
	rtm.on CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) =>
		{channels, users} = rtmStartData
		process.knode_slack = {channels: channels, users: users}

		console.log "Slack RTM: Logged in as #{rtmStartData.self.name} of team #{rtmStartData.team.name}, but not yet connected to a channel"

	rtm.start()

	getVar = (varname, done) ->
		repeats = 3
		interval = 1000
		x = 0

		myInterval = setInterval () =>
			if process.knode_slack[varname]?
				clearInterval myInterval
				done null, process.knode_slack[varname]
			else
				x++
				clearInterval myInterval if x is repeats
		, interval

	getChannels: (done) -> getVar 'channels', done

	getUsers: (done) -> getVar 'users', done
