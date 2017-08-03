(function() {
  module.exports = function(config) {
    var slackRtm, slackWebApi;
    slackWebApi = require('./lib/slack_web')(config);
    slackRtm = require('./lib/slack_rtm')(config);
    return {
      postMessage: function(target, subject, message, attachments, done) {
        return slackWebApi.postMessage(target, subject, message, attachments, done);
      },
      getChannels: function(done) {
        return slackRtm.getChannels(done);
      },
      getUsers: function(done) {
        return slackRtm.getUsers(done);
      },
      messages: require('./lib/messages')
    };
  };

}).call(this);
