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
      console.log($scope.listStages)
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

  // le stage à modifier
  $scope.currentItem = {}
  $scope.init = function (item) {
    let Sujetdustage = document.getElementById("Sujetdustage")
    Sujetdustage.value = item.Sujetdustage 
    let Raisonsociale = document.getElementById("Raisonsociale")
    Raisonsociale.value = item.Raisonsociale;
    let VilledeStage = document.getElementById("VilledeStage")
    VilledeStage.value = item.VilledeStage;
    let PaysdeStage = document.getElementById("PaysdeStage")
    PaysdeStage.value = item.PaysdeStage;
    let Datededebut = document.getElementById("Datededebut")
    Datededebut.value = item.Datededebut;
    let Datedefin = document.getElementById("Datedefin")
    Datedefin.value = item.Datedefin;

    // le stage à modifier
    currentItem = item
  }

  $scope.SaveModifications = function () {
    let Sujetdustage = document.getElementById("Sujetdustage").value
    let Raisonsociale = document.getElementById("Raisonsociale").value
    let VilledeStage = document.getElementById("VilledeStage").value
    let PaysdeStage = document.getElementById("PaysdeStage").value
    let Datededebut = document.getElementById("Datededebut").value
    let Datedefin = document.getElementById("Datedefin").value

    let newItem = {
      'Sujetdustage': Sujetdustage,
      'Raisonsociale':Raisonsociale,
      'VilledeStage': VilledeStage,
      'PaysdeStage': PaysdeStage,
      'Datededebut': Datededebut,
      'Datedefin': Datedefin
    }
    let indexItem = $scope.listStages.indexOf(currentItem);
    $scope.listStages[indexItem] = newItem
    toolsFactory.notifySucess('Données du stage modifiées avec succés')
    $('#modifyModal').modal('hide')
  }

  $scope.checkIsAdmin()
})
