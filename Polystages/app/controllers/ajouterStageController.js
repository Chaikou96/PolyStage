controllers.controller('ajouterStageController', function ($scope,$rootScope, stageFactory,convertJsonFactory, entreprisesFactory, toolsFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  $scope.listStages
  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  let fileList;
  const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
     fileList = event.target.files;
  });
    
  
  $scope.loadStagesFromCsv = function () {
      
    convertJsonFactory.convertStagesToJson(fileList[0].name).then(success => {
        $scope.listStages = success.data
      toolsFactory.notifySucess('Les stages sont récupérés avec succés ')
    }, error => {
        toolsFactory.notifyFailure('Les stages ne sont pas récupérés suite à un problème ')
    })
    
    
  }
    

  $scope.saveStages = function () {
    $scope.listStages.forEach(element => {
      stageFactory.createStageWithCsv(element).then(success => {
        toolsFactory.notifySucess('Les stages sont enregistrés avec succés')
      }, error => {
        toolsFactory.notifyFailure('Erreur, Les données du stage(s) ne sont pas enregistrées' )
      })
    });
    /*setTimeout(function () {
      location.reload()
    }, 3000)*/
  }

  $scope.cancelSave = function () {
    location.reload()
  }  

  $scope.checkIsAdmin()
})
