/*******************************************************************************
 *
 * App
 *
 ******************************************************************************/
console.log('init-1');
var connectApp = angular.module('connectApp',['connectApp.services']);
connectApp.
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/medewerkers', {templateUrl: 'partials/medewerkers.html'
                                 , controller: MedewerkersListCtrl}).
            when('/medewerkers/:medewerkerId', {templateUrl: 'partials/medewerker-details.html'
                                          , controller: MedewerkerDetailCtrl}).
/*
            when('/klanten', {templateUrl: 'partials/klanten.html', controller: KlantenListCtrl}).
            when('/projecten', {templateUrl: 'partials/projecten.html', controller: ProjectenListCtrl}).
*/
            otherwise({redirectTo: '/medewerkers'});
}]);

/*******************************************************************************
 *
 * Services
 *
 ******************************************************************************/
console.log('init-2');
var connectSvc = angular.module('connectApp.services',['ngResource']);
connectSvc.
    factory('Medewerker', function($resource){
		console.log('medewerkerSvc');
        return $resource('/medewerkers/:medewerkerId', {}, {
            query: {method:'GET', params:{medewerkerId:'all'}, isArray:true}
        });
    });

/*******************************************************************************
 *
 * Controllers
 *
 ******************************************************************************/

console.log('init-3');
function MedewerkersListCtrl($scope,Medewerker){
		console.log('MedewerkersListCtrl');
		// $scope.medewerkers = [
		//     { id:'0', voornaam:'koos', achternaam:'koets'},
		//     { id:'1', voornaam:'sjaak', achternaam:'swart'}
		// ];
		$scope.medewerkers = Medewerker.query();
	};
MedewerkersListCtrl.$inject = ['$scope','Medewerker'];

console.log('init-4');
function MedewerkerDetailCtrl($scope, $routeParams,Medewerker){
	console.log('MedewerkerDetailCtrl');
	$scope.medewerker = Medewerker.get({medewerkerId:$routeParams.medewerkerId});
	$scope.queryMedewerker = function(medewerkerId){
		console.log("queryMedewerker: " + medewerkerId);
		$scope.medewerker = Medewerker.get({medewerkerId:medewerkerId});
	};
	$scope.next = function(){
		console.log("next");
		$scope.medewerker = Medewerker.get({medewerkerId:$scope.medewerker.id.id + 1});
	};
}
MedewerkerDetailCtrl.$inject = ['$scope','$routeParams','Medewerker'];

/*
console.log('init-5');
function KlantenListCtrl($scope,$routeParams){
    $scope.klanten = [
        { id:'0', naam: 'Hout is ons'},
        { id:'1', naam: 'Mussel Oil'}
    ];

}

console.log('init-6');
function ProjectenListCtrl($scope,$routeParams){
    $scope.projecten = [
        { id:'0', naam: 'backend schrijven'},
        { id:'1', naam:'web advies'}
    ];

}
*/
console.log('init-7');

