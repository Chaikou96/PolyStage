simpleApp.factory('entreprisesFactory', function ($http) {
    return {
        getEntreprises: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/entreprises'
            })
        },
        getEntreprisesName: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/entreprises/?fields=nomcomplet,identreprise'
            })
        },
        getEntreprisesNameById: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/entreprises/ById/' + id,
                params : { 'identreprise' : id }
            })
        },
        addEntreprise: function (name) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/entreprises',
                data: { nomcomplet: name }
            })
        }
    }
})
