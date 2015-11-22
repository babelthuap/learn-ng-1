'use strict';

angular.module("twitterApp", [])
.constant("VARS", {
  LIMIT: 42
})
.controller("tweetForm", function($scope, VARS, tweetLogSvc) {
  // handle everything to do with the tweet input directly

  $scope.tweet = {text: ''};

  $scope.invalidTweet = () => $scope.charactersLeft() < 0 ||
                              $scope.tweet.text.length === 0;

  $scope.charactersLeft = () => VARS.LIMIT - $scope.tweet.text.length;

  $scope.addTweet = () => {
    tweetLogSvc.addTweet($scope.tweet);
    $scope.tweet = {text: ''};
    return;
  }

  $scope.tweets = tweetLogSvc.tweets;
  $scope.noTweets = tweetLogSvc.noTweets;
  $scope.deleteTweet = tweetLogSvc.deleteTweet;
  $scope.favoriteTweet = tweetLogSvc.favoriteTweet;
  $scope.tweetsToDisplay = tweetLogSvc.tweetsToDisplay;
})
.service("tweetLogSvc", function() {
  // handle the list of tweets

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
      if (tweets[key].text.indexOf(query) !== -1) {
        filtered[key] = tweets[key];
      }
    });

    return filtered;
  };
})
