simpleApp.factory('enseignantsFactory', function ($http) {
    return {
        getEnseignants: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/enseignants'
            })
        }
    }
})
