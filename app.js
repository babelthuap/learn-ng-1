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


  $scope.filtered = tweetLog.filtered;
  $scope.tweets = tweetLog.tweets;
  $scope.deleteTweet = tweetLog.deleteTweet;
  $scope.favoriteTweet = tweetLog.favoriteTweet;
  $scope.tweetsToDisplay = tweetLog.tweetsToDisplay;

  $scope.addTweet = function() {
    tweetLog.addTweet($scope.tweet);
    $scope.tweet = {text: ''};
  }
  
  $scope.$watch('query', function(newValue, oldValue) {
    $scope.filtered = {};
    Object.keys($scope.tweets).forEach(function(key){
      if ($scope.tweets[key].text.match(newValue)) {
        $scope.filtered[key] = $scope.tweets[key];
      }
    })
  })

})
.service("tweetLog", function() {
  this.filtered = this.tweets = {};

  this.addTweet = function(tweet) {
    this.tweets[Date.now()] = tweet;
  }

  this.deleteTweet = function(key) {
    delete this.tweets[key];
  }

  this.favoriteTweet = function(key) {
    this.tweets[key].fav = !this.tweets[key].fav;
  }

  this.tweetsToDisplay = function(query) {
    return query ? this.filtered : this.tweets;
  }


})




































