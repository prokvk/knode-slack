module.exports = do () ->

	getTemplateTypes = () -> ['success', 'error']

	_getMessageParamSchema = () ->
		type: 'object'
		required: true
		properties:
			text: {type: 'string'}
			template:
				type: 'object'
				properties:
					type: {type: 'string'}
					fields:
						type: 'array'
						items:
							type: 'object'
							properties:
								title: {type: 'string'}
								value: {type: 'string'}
								short: {type: 'boolean'}
			attachments:
				type: 'array'
				items:
					type: 'object'
					properties:
						title: {type: 'string'}
						text: {type: 'string'}
						color: {type: 'string'}
						fields:
							type: 'array'
							items:
								type: 'object'
								properties:
									title: {type: 'string'}
									value: {type: 'string'}
									short: {type: 'boolean'}

	validateMessageData: (msgData, done) ->
		if !msgData.text? and !msgData.attachments?
			return done "Invalid message data. Either `text` or `attachments` property is required"

		if msgData.template?
			if !msgData.text?
				return done "Template can be used only in combination with \"text\" parameter"

			if getTemplateTypes().indexOf(msgData.template.type) is -1
				return done "Invalid template type. Valid types are \"#{getTemplateTypes().join(',')}\""

		done()

	getDataForPostMessage: (subject, msgData) ->
		if msgData.template?
			message = null
			attachments = [
				{
					title: subject || null
					text: msgData.text
					color: if msgData.template.type is 'success' then 'good' else 'danger'
					fields: msgData.template.fields || null
				}
			]
			subject = null
		else
			message = msgData.text || null
			attachments = msgData.attachments || null

		subject: subject
		message: message || ''
		attachments: attachments

	getMessageParamSchema: _getMessageParamSchema
