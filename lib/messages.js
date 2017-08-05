(function() {
  module.exports = (function() {
    var _getMessageParamSchema, getTemplateTypes;
    getTemplateTypes = function() {
      return ['success', 'error'];
    };
    _getMessageParamSchema = function() {
      return {
        type: 'object',
        required: true,
        properties: {
          text: {
            type: 'string'
          },
          template: {
            type: 'object',
            properties: {
              type: {
                type: 'string'
              },
              fields: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string'
                    },
                    value: {
                      type: 'string'
                    },
                    short: {
                      type: 'boolean'
                    }
                  }
                }
              }
            }
          },
          attachments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string'
                },
                text: {
                  type: 'string'
                },
                color: {
                  type: 'string'
                },
                fields: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: {
                        type: 'string'
                      },
                      value: {
                        type: 'string'
                      },
                      short: {
                        type: 'boolean'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
    };
    return {
      validateMessageData: function(msgData, done) {
        if ((msgData.text == null) && (msgData.attachments == null)) {
          return done("Invalid message data. Either `text` or `attachments` property is required");
        }
        if (msgData.template != null) {
          if (msgData.text == null) {
            return done("Template can be used only in combination with \"text\" parameter");
          }
          if (getTemplateTypes().indexOf(msgData.template.type) === -1) {
            return done("Invalid template type. Valid types are \"" + (getTemplateTypes().join(',')) + "\"");
          }
        }
        return done();
      },
      getDataForPostMessage: function(subject, msgData) {
        var attachments, message;
        if (msgData.template != null) {
          message = null;
          attachments = [
            {
              title: subject || null,
              text: msgData.text,
              color: msgData.template.type === 'success' ? 'good' : 'danger',
              fields: msgData.template.fields || null,
              mrkdwn_in: ['title', 'text']
            }
          ];
          subject = null;
        } else {
          message = msgData.text || null;
          attachments = msgData.attachments || null;
        }
        return {
          subject: subject,
          message: message || '',
          attachments: attachments
        };
      },
      getMessageParamSchema: _getMessageParamSchema
    };
  })();

}).call(this);
