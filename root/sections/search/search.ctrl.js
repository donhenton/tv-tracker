angular.module('app.core').controller('SearchController', function (ShowService, $timeout, StoreFactory) {
    var vm = this;
    vm.results = false;
    vm.searching = false;

    vm.query = function (query)
    {
        vm.searching = true;
        ShowService.search(query).then(function (response)
        {
            //console.log(" called "+ query );
            vm.results = response;
            $timeout(function ()
            {
                vm.searching = false;
            }, 500)
        }).catch(function (error)
        {
            console.log("error " + error);
        });
    };
    vm.typeahead = function (query) {
        return ShowService.search(query).then(function (response) {
            return response.map(function (show) {
                return show.name;
            });
        });
    };

});
