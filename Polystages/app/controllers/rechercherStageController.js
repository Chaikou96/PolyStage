controllers.controller('rechercherStageController', function ($scope,$rootScope, stageFactory,userFactory,convertJsonFactory, entreprisesFactory, $location) {
  $scope.checkIsAdmin = function () {
    if ($rootScope.admin != 1)
      $location.path("/404")
  }

  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 
  
  var state = {
    'querySet': '',
    'page': 1,
    'rows': 7,
    'window': 10,
}
  

  $scope.init = function(item)
  {
    stageItem = item;
  };


  $scope.setSearchValue = function () {
    $scope.val = document.getElementById("searchBar").value
    console.log($scope.val)
  }

  // recuperer tous les stages
  $scope.getAllStages = function () {
    stageFactory.getAllStages()
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
        state.querySet = $scope.stages
        console.log(state.querySet)
        setPagination()
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  $scope.getAllStages()

  // recuperer les stages avec la valeur dans search bar
  $scope.allStagesBySearchValue = function (searchValue) {
    $scope.val = document.getElementById("searchBar").value
    console.log(searchValue)
    if (!searchValue)
      $scope.getAllStages()
    stageFactory.getStagesByVal(searchValue)
      .then(function (success) {
        $scope.stages = success.data
        $scope.getNomEntreprise($scope.stages)
        state.querySet = $scope.stages
        setPagination()
      }, function (error) {
        //$scope.erreurAuthentification()
      })
  }

  // fonction pour la conversion du stage ( json to csv )
  $scope.oneStageJsonToCsv = function (data) {
    convertJsonFactory.convertOneStageJsonToCsv(data).then(success => {
      notifySucess()
      window.open('http://localhost:8080/downloadFileStagesCSV', '_blank');
    }, error => {
      notifyFailure()
    })
    
  }

  $scope.allStagesJsonToCsv = function (data) {
    convertJsonFactory.convertAllStagesJsonToCsv(data).then(success => {
      notifySucess()
      window.open('http://localhost:8080/downloadFileStagesCSV', '_blank');
    }, error => {
      notifyFailure()
    })

  }

  const notifySucess = function () {
    alertify.set('notifier','position', 'bottom-left');
    alertify.success('Fichier téléchargé avec succés');
  }
  
  const notifyFailure = function () {
    alertify.set('notifier','position', 'bottom-left');
    alertify.error('Nous ne pouvons pas télécharger le fichier suite à un problème ');
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


  
const setPagination = function() {
    buildTable()

    function pagination(querySet, page, rows) {
    
      var trimStart = (page - 1) * rows
      var trimEnd = trimStart + rows
    
      var trimmedData = querySet.slice(trimStart, trimEnd)
    
      var pages = Math.round(querySet.length / rows);
    
      return {
          'querySet': trimmedData,
          'pages': pages,
      }
    }
    
    function pageButtons(pages) {
        var wrapper = document.getElementById('pagination-wrapper')
    
        wrapper.innerHTML = ``
        console.log('Pages:', pages)
    
        var maxLeft = (state.page - Math.floor(state.window / 2))
        var maxRight = (state.page + Math.floor(state.window / 2))
    
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
        }
    
        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)
            
            if (maxLeft < 1){
              maxLeft = 1
            }
            maxRight = pages
        }
    
    
    
        for (var page = maxLeft; page <= maxRight; page++) {
          wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
        }
    
        if (state.page != 1) {
            wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
        }
    
        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
        }
    
        $('.page').on('click', function() {
            $('#table-body').empty()
    
            state.page = Number($(this).val())
    
            buildTable()
        })
    
    }
    
    
    function buildTable() {
      var table = $('#table-body')

      $('#table-body').empty()

      var data = pagination(state.querySet, state.page, state.rows)
      var myList = data.querySet
    
      for (var i = 1 in myList) {
          //Keep in mind we are using "Template Litterals to create rows"
        var row = ` <tr>
                      <th scope="row">${i}</th>
                      <td>${myList[i].titrestage}</td>
                      <td>${myList[i].description}</td>
                      <td>${myList[i].nomentreprise}</td>
                      <td>${myList[i].niveau}</td>
                      <td>${myList[i].annee}</td>
                      <td> <a href="#!/detailsDuStage" > <button ng-click="${$scope.init(myList[i])}"  class="btn btn-outline-primary ">Détails</button> </a> </td>
                    </tr>`
          table.append(row)
      }
    
      pageButtons(data.pages)
      delete myList
    }
} 


  // une grande partie doit se deplacer dans un nouveau controller rechercherStageController 

  $scope.checkIsAdmin()
})