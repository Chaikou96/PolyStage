controllers.controller('ajouterStageController', function ($scope,$rootScope, stageFactory,convertJsonFactory, entreprisesFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  
  const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    
    convertJsonFactory.convertStagesToJson(fileList).then(success => {
      toastr.success("Le stage a bien été créé")
    }, error => {
      toastr.error("Une erreur s'est produite") 
    })
  });



  $scope.checkIsAdmin()
})