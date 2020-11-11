controllers.controller('ajouterStageController', function ($scope,$rootScope, stageFactory,convertJsonFactory, entreprisesFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  $scope.listStages
  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  
  const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    
    convertJsonFactory.convertStagesToJson(fileList[0].name).then(success => {
      
      $scope.listStages = success.data
      toastr.success("Informations récupèréés avec succés")
    }, error => {
      toastr.error("Une erreur s'est produite") 
    })

  });

  $scope.saveStages = function () {
    $scope.listStages.forEach(element => {
      stageFactory.createStageWithCsv(element).then(success => {
        toastr.success("Stages enregistrés avec succés")
      }, error => {
        toastr.error("Une erreur s'est produite")
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
