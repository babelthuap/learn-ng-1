angular.module("twitterApp", [])
.constant("VARS", {
  LIMIT: 42
})
.controller("tweetForm", function($scope, VARS) {
  $scope.tweet = {text: ''};

  $scope.tweets = [
    { text: "Tweet 1", fav: false }, { text: "Tweet 2", fav: true }, { text: "Tweet 3", fav: false }
  ];

  $scope.invalidTweet = function() {
    return $scope.charactersLeft() < 0 || $scope.tweet.text.length === 0;
  }

  $scope.charactersLeft = function() {
    return VARS.LIMIT - $scope.tweet.text.length;
  };

  $scope.addTweet = function() {
    $scope.tweets.unshift($scope.tweet);
    $scope.tweet = {text: ''};
  }

  $scope.deleteTweet = function(index) {
    $scope.tweets.splice(index, 1);
  }
});
