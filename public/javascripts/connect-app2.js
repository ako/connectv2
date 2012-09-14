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
            when('/timesheet',{templateUrl:'partials/timesheet.html',controller: TimesheetCtrl}).
            otherwise({redirectTo: '/medewerkers'});
}]);

/*
            when('/klanten', {templateUrl: 'partials/klanten.html', controller: KlantenListCtrl}).
            when('/projecten', {templateUrl: 'partials/projecten.html', controller: ProjectenListCtrl}).
*/

/*******************************************************************************
 *
 * Directives
 *
 ******************************************************************************/
connectApp.filter('hourCheck', function hourCheck(){
    return function(input){
        var hourCheck = "enough";
        if (parseInt(input) < 8){
            hourCheck = "notEnough";
        } else if (parseInt(input) > 8) {
            hourCheck = "extraHours";
        }
        return hourCheck;
    }
});
connectApp.directive('doKeyBinding', function factory() {
    return function postLink(scope, iElement, iAttrs) {
        console.log(iElement);
        console.log(iAttrs);
        $(iElement).bind('keyup','$',
            function(evt){
                console.log(evt.keyCode);
                // 37  - left
                // 38  - up
                // 39  - right
                // 40  - down
                var s = "" + iAttrs.doKeyBinding;
                var row = parseInt(s.split(",")[0]);
                var cell = parseInt(s.split(",")[1]);
                console.log("row = " + row);
                console.log("cell = " + cell);
                if (evt.keyCode == 37 ){
                    console.log('down');
                    cell -= 1;
                }
                if (evt.keyCode == 38 ){
                    console.log('down');
                    row -= 1;
                }
                if (evt.keyCode == 39 ){
                    console.log('down');
                    cell += 1;
                }
                if (evt.keyCode == 40 ){
                    console.log('down');
                    row += 1;
                }
                console.log("#cell-" + row + "-" + cell);
                $("#cell-" + row + "-" + cell).focus().select();
            }
        );
    }
});

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
		$scope.medewerkers = Medewerker.query();
	};
MedewerkersListCtrl.$inject = ['$scope','Medewerker'];

        // $scope.medewerkers = [
        //     { id:'0', voornaam:'koos', achternaam:'koets'},
        //     { id:'1', voornaam:'sjaak', achternaam:'swart'}
        // ];
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

function TimesheetCtrl($scope,$routeParams){
    console.log("TimesheetCtrl");
    $scope.timesheet = [
        {id:0,allocatie:'aloc1',omschrijving:'ontwerp',jaar:2012,maand:8,
            uren:[{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0}
            ]},
        {id:1,allocatie:'aloc1',omschrijving:'test',jaar:2012,maand:8,
            uren:[{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0}
            ]},
        {id:2,allocatie:'aloc2',omschrijving:'implementatie',jaar:2012,maand:8,
            uren:[{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
                {uren:0},{uren:0},{uren:0}
            ]}
    ];
    $scope.sum = [ {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
            {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
            {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
            {uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},{uren:0},
            {uren:0},{uren:0},{uren:0}
        ];

    $scope.print = function(){
        console.log($scope.timesheet);
    };
    $scope.somUrenDag = function(dag){
        console.log("somUrenDag: " + dag);
        var som = 0;
        _.each($scope.timesheet,function(aloc){
            console.log("aloc = " + aloc.id + ", " + aloc.uren[dag].uren);
            som = som + parseInt(aloc.uren[dag].uren);
        });
        console.log("som[" + dag + "] = " + som);
        $scope.sum[dag].uren = som;
    }

}
TimesheetCtrl.$inject = ['$scope','$routeParams'];

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

