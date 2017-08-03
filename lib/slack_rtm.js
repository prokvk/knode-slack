(function() {
  module.exports = function(config) {
    var CLIENT_EVENTS, RtmClient, botToken, getVar, rtm;
    RtmClient = require('@slack/client').RtmClient;
    CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
    botToken = config.bot_token || '';
    rtm = new RtmClient(botToken);
    process.knode_slack = {
      channels: null,
      users: null
    };
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (function(_this) {
      return function(rtmStartData) {
        var channels, users;
        channels = rtmStartData.channels, users = rtmStartData.users;
        process.knode_slack = {
          channels: channels,
          users: users
        };
        return console.log("Slack RTM: Logged in as " + rtmStartData.self.name + " of team " + rtmStartData.team.name + ", but not yet connected to a channel");
      };
    })(this));
    rtm.start();
    getVar = function(varname, done) {
      var interval, myInterval, repeats, x;
      repeats = 3;
      interval = 1000;
      x = 0;
      return myInterval = setInterval((function(_this) {
        return function() {
          if (process.knode_slack[varname] != null) {
            clearInterval(myInterval);
            return done(null, process.knode_slack[varname]);
          } else {
            x++;
            if (x === repeats) {
              return clearInterval(myInterval);
            }
          }
        };
      })(this), interval);
    };
    return {
      getChannels: function(done) {
        return getVar('channels', done);
      },
      getUsers: function(done) {
        return getVar('users', done);
      }
    };
  };

}).call(this);
