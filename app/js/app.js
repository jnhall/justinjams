var app = angular.module('myApp', []);

angular.module('myApp')
  .controller('MyCtrl', function ($scope, $timeout) {
  	var i = 0;
  	// var fader = function() {
  	// 	$timeout(function() {
  	// 		$scope.fade = '#'+((i+=1)%4368).toString(16);
  	// 		console.log('#'+((i+=1)%4368).toString(16));
  	// 		fader();
  	// 	}, 1000);
  	// };
  	// fader();
  });