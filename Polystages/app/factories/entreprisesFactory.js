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
        addEntreprise: function (name) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/entreprises',
                data: { nomcomplet: name }
            })
        }
    }
})
