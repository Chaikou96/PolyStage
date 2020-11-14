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
      notifySucess('Les stages sont récupérés avec succés ')
    }, error => {
      notifyFailure('Les stages ne sont pas récupérés suite à un problème ')
    })

  });

  $scope.saveStages = function () {
    $scope.listStages.forEach(element => {
      stageFactory.createStageWithCsv(element).then(success => {
        notifySucess('Les stages sont enregistrés avec succés')
      }, error => {
        notifyFailure('Erreur, Les données du stage(s) ne sont pas enregistrées' )
      })
    });
    /*setTimeout(function () {
      location.reload()
    }, 3000)*/
  }

  const notifySucess = function (msg) {
    alertify.set('notifier','position', 'bottom-left');
    alertify.success(msg);
  }
  
  const notifyFailure = function (msg) {
    alertify.set('notifier','position', 'bottom-left');
    alertify.error(msg);
  }

  $scope.cancelSave = function () {
    location.reload()
  }  

  $scope.checkIsAdmin()
})
