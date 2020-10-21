simpleApp.factory('convertJsonFactory', function ($http) {
    return {
        convertJsonToCsv: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/convertJsonToCsv',
                params : { 'data' : data }
            })
        }
    }
})
