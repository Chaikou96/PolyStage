controllers.controller('rechercherStageController', function ($scope,$rootScope, stageFactory,userFactory,convertJsonFactory, entreprisesFactory, toolsFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  let state = {
    'querySet': '',
    'page': 1,
    'rows': 10,
    'window': 10,
}
  
  /* var selectElem = document.getElementById('selectorNbStages');

  // Quand une nouvelle <option> est selectionnée
  selectElem.addEventListener('change', function() {
    var value = selectElem.options[selectElem.selectedIndex].value;
    // set state number rows
    state.rows = value
    toolsFactory.setPagination(state,$scope.init)
  }) */
  
  
  $scope.init = function(item)
  {
    stageItem = item;

  };


  $scope.setSearchValue = function () {
    $scope.val = document.getElementById("searchBar").value
    //console.log($scope.val)
  }

  // recuperer tous les stages
  $scope.getAllStages = function () {
    stageFactory.getAllStages()
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
        state.querySet = $scope.stages
        toolsFactory.setPagination(state,$scope.init)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  $scope.getAllStages()

  // recuperer les stages avec la valeur dans search bar
  $scope.allStagesBySearchValue = function (searchValue) {
    $scope.val = document.getElementById("searchBar").value
    if (!searchValue)
      $scope.getAllStages()
    stageFactory.getStagesByVal(searchValue)
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
        state.querySet = $scope.stages
        toolsFactory.setPagination(state,$scope.init)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  // fonction pour la conversion du stage ( json to csv )
  $scope.oneStageJsonToCsv = function (data) {
    convertJsonFactory.convertOneStageJsonToCsv(data).then(success => {
      toolsFactory.notifySucess('Fichier téléchargé avec succés')
      window.open('http://localhost:8080/downloadFileStagesCSV', '_blank');
    }, error => {
      toolsFactory.notifyFailure('Une erreur s\'est produite, le fichier n\'est pas téléchrgé')
    })
  }

  $scope.allStagesJsonToCsv = function (data) {
    let allStageId = getAllStagesId(data)
    convertJsonFactory.convertAllStagesJsonToCsv(allStageId).then(success => {
      toolsFactory.notifySucess('Fichier téléchargé avec succés')
      window.open('http://localhost:8080/downloadFileStagesCSV', '_blank');
    }, error => {
      toolsFactory.notifyFailure('Une erreur s\'est produite, le fichier n\'est pas téléchrger')
    })
  }

  const getAllStagesId = function (data) {
    let allIdStages = [];
    data.forEach(element => allIdStages.push(element.idstage))
    return allIdStages
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
  $scope.getNomEntreprise = function (stages) {
    stages.forEach(element => {
      entreprisesFactory.getEntreprisesNameById(element.identreprise)
        .then(function (success) {
          element.nomentreprise = success.data[0].nomcomplet
        })
    });
    return stages
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


  $scope.setNbStagePerPage = function (selectedNb) {
    console.log(selectedNb)
    let index = selectedNb.selectedIndex
    let nbStagePerPage = selectedNb.options[index].value
    console.log(nbStagePerPage)
}
 
  $scope.checkIsAdmin()
})