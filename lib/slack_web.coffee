async = require 'async'
_ = require 'lodash'

module.exports = (config) ->

	WebClient = require('@slack/client').WebClient
	botToken = config.bot_token || ''
	web = new WebClient botToken

	opts =
		as_user: true

	postMessage: (target, subject, message, attachments, done) ->
		message = "*#{subject}*\n\n#{message}" if subject? and message?

		msgOpts = _.cloneDeep opts
		msgOpts.attachments = attachments if attachments?

		async.eachSeries target, (item, cb) ->
			web.chat.postMessage item, message, msgOpts,  cb
		, done
