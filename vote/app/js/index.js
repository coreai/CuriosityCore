// Voting bindings 
// this gets compiled and appended into app.js
    // Using angular, because jQuery doesn't have scopes and generally sucks...
    var app = angular.module('Vote', []);

    // Voting Controller
    app.controller('voteCtrl', function ($scope) {

        console.log (Voting)

        $scope.decisions = {"Rama": "1", "Nick": "2", "Jose": "3"}
        $scope.counts = {}
        $scope.total = 0
    
        $scope.max_decision = "";
        $scope.max_count = 0;
    
        $scope.getvoteCount = function(name) {
    
            // get the count from the blockchain
            var count = Voting.methods.totalVotesFor.call(name).toString(); 
            console.log(count)          
            // add name/count to counts object
            $scope.counts[name] = count;

            console.log ($scope.counts)
    
            if (count > $scope.max_count) {
                $scope.max_count = count;
                $scope.max_candidate = name;
            }
            $scope.total++;
    
        } 
        
        $scope.voteforDecision = function(name) {
            console.log(name)
            Voting.methods.voteForDecision(name).send({from: web3.eth.defaultAccount}, function() {
                console.log('Voted for' + name);
                $scope.getvoteCount (name);
    
            });
        }
        
        $scope.max_percentage = function() {
            if ($scope.max_count === 0 || $scope.total === 0)
              return 0;
            var frac = $scope.max_count / $scope.total * 100;
            return Math.round(frac * 10) / 10;
          }
    
          angular.element(document).ready(function () {
            // Count votes foreach when the app starts
            angular.forEach($scope.decisions, function(value, name) {
                console.log(name)
                $scope.getvoteCount(name); 
            })
    
          });
      })
    

    