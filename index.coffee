module.exports = (config) ->
	slackWebApi = require('./lib/slack_web') config
	slackRtm = require('./lib/slack_rtm') config

	postMessage: (target, subject, message, attachments, done) ->
		slackWebApi.postMessage target, subject, message, attachments, done

	getChannels: (done) -> slackRtm.getChannels done

	getUsers: (done) -> slackRtm.getUsers done

	messages: require './lib/messages'
