angular.module("twitterApp", [])
.constant("VARS", {
  LIMIT: 42
})
.controller("tweetForm", function($scope, VARS, tweetLog) {
  $scope.tweet = {text: ''};

  $scope.invalidTweet = function() {
    return $scope.charactersLeft() < 0 || $scope.tweet.text.length === 0;
  }

  $scope.charactersLeft = function() {
    return VARS.LIMIT - $scope.tweet.text.length;
  };

  $scope.addTweet = function() {
    tweetLog.addTweet($scope.tweet);
    $scope.tweet = {text: ''};
    return;
  }

  $scope.tweets = tweetLog.tweets;
  $scope.noTweets = tweetLog.noTweets;
  $scope.deleteTweet = tweetLog.deleteTweet;
  $scope.favoriteTweet = tweetLog.favoriteTweet;
  $scope.tweetsToDisplay = tweetLog.tweetsToDisplay;

})
.service("tweetLog", function() {
  this.tweets = {};

  this.noTweets = function() {
    return !Object.keys(this.tweets).length;
  }

  this.addTweet = function(tweet) {
    this.tweets[Date.now()] = tweet;
    return;
  };

  this.deleteTweet = function(key) {
    delete this.tweets[key];
    return;
  };

  this.favoriteTweet = function(key) {
    this.tweets[key].fav = !this.tweets[key].fav;
    return;
  };

  this.tweetsToDisplay = function(query) {
    if (!query) return this.tweets;

    var filtered = {};
    var tweets = this.tweets;
    Object.keys(tweets).forEach(function(key) {
      if (tweets[key].text.match(query)) {
        filtered[key] = tweets[key];
      }
    });

    return filtered;
  };

})
