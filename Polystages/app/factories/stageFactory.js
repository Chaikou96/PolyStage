simpleApp.factory('stageFactory', function ($http) {
    return {

        // requete http pour la conversion du stage ( json to csv )
        convertAllStagesJsonToCsv: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/convertAllStagesJsonToCsv',
                params : { "data" : data }
            })
        },

        convertOneStageJsonToCsv: function (data) {
            return  $http({
                method: 'POST',
                url: 'http://localhost:8080/convertOneStageJsonToCsv',
                params : { "data" : data }
            })
        },

        getAllStages: function (id) {
           return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages'
            })
        },
        getStagesByIdEleve: function (id) {
            return $http({
                 method: 'GET',
                 url: 'http://localhost:8080/stages/byIdEleve/' + id ,
                 params : { "eleveId" : id }
             })
        },
        // Fonction pour recuperer les stages avec ( année, promo, nom entreprise, description )
        getStagesByVal: function (val) {
            return $http({
                 method: 'GET',
                 url: 'http://localhost:8080/stages/byVal/' + val,
                 params : { "val" : val }
             })
         },
        createStage: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/forms/eleve',
                data: data
            })
        },
        editStage: function (idstage, data) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:8080/stages/' + idstage,
                data: data
            })
        },
        getEleveStages: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/eleves/' + id
            })
        },
        getCurrentStageEleve: function (annee, idEleve) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/current/eleve/stage',
                params: { "annee": annee, "eleveId": idEleve }
            })
        },
        getTuteurStages: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/tuteurs/' + id
            })
        },
        getCurrentStageTuteur: function (annee, idTuteur) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/current/tuteur/stage',
                params: { "annee": annee, "tuteurId": idTuteur }
            })
        },
        getEnsStages: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/ens/' + id
            })
        },
        getCurrentStageEns: function (annee, idEns) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/current/ens/stage',
                params: { "annee": annee, "ensId": idEns }
            })
        },
        getStageById: function (idStage) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/' + idStage,
                params : { 'idstage' : idStage }
            })
        },
        getStageByIdForEval: function (idStage) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/eval/' + idStage
            })
        }
    }
})
