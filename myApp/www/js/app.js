// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('PlatformApp', ['ionic'])
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
				if(window.cordova && window.cordova.plugins.Keyboard) {
						// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
						// for form inputs)
						cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

						// Don't remove this line unless you know what you are doing. It stops the viewport
						// from snapping when text inputs are focused. Ionic handles this internally for
						// a much nicer keyboard experience.
						cordova.plugins.Keyboard.disableScroll(true);
				}
				if(window.StatusBar) {
						StatusBar.styleDefault();
				}
		});
})
.config(function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('tabs',{
				url:'/tab',
				abstract:true,
				templateUrl:'templates/tabs.html'
		})
		.state('tabs.list',{
			url:'/list',
			views:{
				"list-tab":{
					templateUrl:'templates/list.html',
					controller:'ListController'
				}
			}
		})
		.state('tabs.home',{
			url:'/home',
			views:{
				"home-tab":{
					templateUrl:'templates/home.html'
				}
			}
		})
		.state('tabs.detail',{
			url:'/list/:aId',
			views:{
				"list-tab":{
					templateUrl:'templates/details.html',
					controller:'ListController'
				}
			}
		})
		.state('tabs.calendar',{
			url:'/calendar',
			views:{
				"calendar-tab":{
					templateUrl:'templates/calendar.html',
					controller:'CalendarController'
				}
			}
		})
		.state('tabs.device',{
			url:'/device',
			views:{
				"device-tab":{
					templateUrl:'templates/device.html',
					controller:'PlatformController'
				}
			}
		})
		$urlRouterProvider.otherwise('/tab/home')
})
.controller(
	'DeviceController',
	[
		'$scope',
		'$http',
		'$state',
		function($scope,$http,$state){
			console.log('deviceController');	
		}
	]
)

.controller('PlatformController', function($scope) {

	ionic.Platform.ready(function(){
	  // will execute when device is ready, or immediately if the device is already ready.
	});
  	$scope.deviceInfo ={
	   deviceInformation : ionic.Platform.device(),
	   isWebView : ionic.Platform.isWebView(),
	   isIPad : ionic.Platform.isIPad(),
	   isIOS : ionic.Platform.isIOS(),
	   isAndroid : ionic.Platform.isAndroid(),
	   isWindowsPhone : ionic.Platform.isWindowsPhone(),
	   currentPlatform : ionic.Platform.platform(),
	   currentPlatformVersion : ionic.Platform.version(),
  	}
  //ionic.Platform.exitApp(); // stops the app
})
.controller(
	'CalendarController',
	[
		'$scope',
		'$http',
		'$state',
		function($scope,$http,$state){

			$http.get('js/data.json').success(function(data){
				$scope.calendar=data.calendar;
				
				$scope.onItemDelete=function(dayIndex,item){
						$scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item),1);
				}

				$scope.toggleStar=function(item){
						item.star=!item.star;
						console.log("clicked")
				};

				$scope.doRefresh=function(){
					$http.get('js/data.json').success(function(data){
						$scope.calendar=data.calendar;
						$scope.$broadcast("scroll.refreshComplete");
					});
				}
			});
		}
	]
)
.controller(
	'ListController',
	[
		'$scope',
		'$http',
		'$state',

		function($scope,$http,$state){
			
			$http.get('js/data.json').success(function(data){
				$scope.artists=data.artists;
				$scope.whichartist=$state.params.aId;
				$scope.data={
					showDelete:false,
					showReorder:false
				};


				$scope.onItemDelete=function(item){
						$scope.artists.splice($scope.artists.indexOf(item),1);
				}

				$scope.toggleStar=function(item){
						item.star=!item.star;
						console.log("clicked")
				};

				$scope.doRefresh=function(){
						$http.get('js/data.json').success(function(data){
									$scope.artists=data;
									$scope.$broadcast("scroll.refreshComplete");
								});
				}
				$scope.moveItem=function(item,fromIndex,toIndex){
						$scope.artists.splice(fromIndex,1);
						$scope.artists.splice(toIndex,0,item);
				};
			});
		}
	]
);