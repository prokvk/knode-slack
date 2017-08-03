(function() {
  var _, async;

  async = require('async');

  _ = require('lodash');

  module.exports = function(config) {
    var WebClient, botToken, opts, web;
    WebClient = require('@slack/client').WebClient;
    botToken = config.bot_token || '';
    web = new WebClient(botToken);
    opts = {
      as_user: true
    };
    return {
      postMessage: function(target, subject, message, attachments, done) {
        var msgOpts;
        if ((subject != null) && (message != null)) {
          message = "*" + subject + "*\n\n" + message;
        }
        msgOpts = _.cloneDeep(opts);
        if (attachments != null) {
          msgOpts.attachments = attachments;
        }
        return async.eachSeries(target, function(item, cb) {
          return web.chat.postMessage(item, message, msgOpts, cb);
        }, done);
      }
    };
  };

}).call(this);
