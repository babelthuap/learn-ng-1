angular.module("twitterApp", [])
.constant("VARS", {
  LIMIT: 42
})
.controller("tweetForm", function($scope, VARS) {
  $scope.tweet = {text: ''};

  $scope.tweets = {};

  $scope.invalidTweet = function() {
    return $scope.charactersLeft() < 0 || $scope.tweet.text.length === 0;
  }

  $scope.charactersLeft = function() {
    return VARS.LIMIT - $scope.tweet.text.length;
  };

  $scope.addTweet = function() {
    $scope.tweets[Date.now()] = $scope.tweet;
    $scope.tweet = {text: '', fav: false};
  }

  $scope.deleteTweet = function(key) {
    delete $scope.tweets[key];
  }

  $scope.favoriteTweet = function(key) {
    $scope.tweets[key].fav = !$scope.tweets[key].fav;
  }

  $scope.$watch('tweet.text', function(newValue, oldValue) {
    document.body.style.backgroundColor = (newValue == 42) ? 'black' : 'white';
  })
});
