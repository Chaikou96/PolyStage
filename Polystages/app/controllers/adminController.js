controllers.controller('adminController', function ($scope, $rootScope, retardsFactory, mailsFactory, stageFactory, userFactory, entreprisesFactory, $location, $timeout) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  $scope.stageItem;

  $scope.init = function(item)
  {
    stageItem = item;
  };

  $scope.allStages = function () {
    var val = document.getElementById("searchBar").value
    stageFactory.getStagesByVal(val)
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  $scope.allStagesInfosById = function () {
    stageFactory.getStageById(stageItem.idstage)
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
        $scope.getNomPrenomEleve($scope.stages)
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  $scope.getNomEntreprise = function (stages) {
    $scope.stages.forEach(element => {
      entreprisesFactory.getEntreprisesNameById(element.identreprise)
        .then(function (success) {
          element.nomentreprise = success.data[0].nomcomplet
        })
    });
  }

  $scope.getNomPrenomEleve = function (stages) {
    $scope.stages.forEach(element => {
      userFactory.getEleveNameById(element.ideleve)
        .then(function (success) {
          console.log(success.data[0])
          element.nomEleve = success.data[0].nom
          element.prenomEleve = success.data[0].prenom
        })
    });
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 

  $scope.getRetards = function () {
    $timeout(function () {
      retardsFactory.getRetardsTuteur().then(success1 => {
        $scope.retardsTuteurs = success1.data
        retardsFactory.getRetardsEleve().then(success2 => {
          $scope.retardsEleves = success2.data
          $('#btn-one').remove()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }, 300);
  }

  $scope.sendMails = function () {
    data = {}
    data.retardsTuteurs = $scope.retardsTuteurs;
    data.retardsEleves = $scope.retardsEleves;
    mailsFactory.sendRappels(data).then(success => {
      toastr.success("Les mails ont bien été envoyés")
      retardsFactory.getRetardsTuteur().then(success1 => {
        $scope.retardsTuteurs = success1.data
        retardsFactory.getRetardsEleve().then(success2 => {
          $scope.retardsEleves = success2.data
          $('#btn-one').remove()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

  retardsFactory.updateRetards().then(success => {

  }, error => {
    console.log(error)
  })

  $('#btn-one').click(function () {
    $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Chargement...').addClass('disabled');
  })

  $scope.checkIsAdmin()
  $rootScope.checkConnexion()
})