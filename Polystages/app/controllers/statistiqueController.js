controllers.controller('statistiqueController', function ($scope,$rootScope, stageFactory, userFactory, entreprisesFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // recuperer tous les stages
    $scope.getAllStages = function () {
      stageFactory.getAllStages()
        .then(function (success) {
          $scope.stages = success.data
          $scope.getNomEntreprise($scope.stages)
        }, function (error) {
          //$scope.erreurAuthentification()
        })
    }
    $scope.getAllStages()

  // recuperer les stages par annee
    $scope.allStagesInfosByAnnee = function () {
        stageFactory.getStageByAnnee()
        .then(function (success) {
            $scope.annee = success.data[0].annee
        })
    }

  $scope.checkIsAdmin()
})