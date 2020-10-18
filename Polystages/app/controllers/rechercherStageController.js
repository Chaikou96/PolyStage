controllers.controller('rechercherStageController', function ($scope, $rootScope, retardsFactory, mailsFactory, stageFactory, entreprisesFactory, $location, $timeout) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  $scope.allStages = function () {
    var val = document.getElementById("searchBar").value
    stageFactory.getStagesByVal(val)
      .then(function (success) {
        $scope.stages = success.data
        $scope.stages.forEach(element => {
          console.log(element.identreprise)
          entreprisesFactory.getEntreprisesNameById(element.identreprise)
            .then(function (success) {
              element.nomentreprise = success.data[0].nomcomplet
            })
        });
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  $scope.checkIsAdmin()
  $rootScope.checkConnexion()
})