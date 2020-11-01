controllers.controller('rechercherStageController', function ($scope,$rootScope, stageFactory,userFactory,convertJsonFactory, entreprisesFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  

  $scope.init = function(item)
  {
    stageItem = item;

  };

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

  // recuperer les stages avec la valeur dans search bar
  $scope.allStagesBySearchValue = function () {
    $scope.val = document.getElementById("searchBar").value
    if ( !$scope.val)
      $scope.getAllStages()
    stageFactory.getStagesByVal($scope.val)
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  // fonction pour la conversion du stage ( json to csv )
  $scope.oneStageJsonToCsv = function (data) {
    convertJsonFactory.convertOneStageJsonToCsv(data)
    notifySucess()
  }

  $scope.allStagesJsonToCsv = function (data) {
    convertJsonFactory.convertAllStagesJsonToCsv(data)
    notifySucess()
  }

  const notifySucess = function () {
    toastr.success('Les données du stage(s) sont enregistrées dans le fichier stage.csv avec succés');
  }
  
  const notifyFailure = function () {
    toastr.error('Erreur, Les données du stage(s) ne sont pas enregistrées ');
  }


  // recuperer un stage avec Id
  $scope.allStagesInfosById = function () {
    stageFactory.getStageById(stageItem.idstage)
      .then(function (success) {
        $scope.stageItem = success.data
        $scope.getNomEntreprise($scope.stageItem)
        $scope.getNomPrenomEleve($scope.stageItem)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  // recuperer le nom de l entreprise avec son id 
  $scope.getNomEntreprise = function (stage) {
    stage.forEach(element => {
      entreprisesFactory.getEntreprisesNameById(element.identreprise)
        .then(function (success) {
          element.nomentreprise = success.data[0].nomcomplet
        })
    });
  }

  // recuperer le nom et le prenom de l'eleve avec son id
  $scope.getNomPrenomEleve = function (stage) {
    stage.forEach(element => {
      userFactory.getEleveNameById(element.ideleve)
        .then(function (success) {
          console.log(success.data[0])
          element.nomEleve = success.data[0].nom
          element.prenomEleve = success.data[0].prenom
        })
    });
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 

  $scope.checkIsAdmin()
})