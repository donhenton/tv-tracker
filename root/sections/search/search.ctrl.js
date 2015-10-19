angular.module('app.core').controller('SearchController', function (ShowService, $timeout,StoreFactory) {
    var vm = this;
    vm.results = false;
    vm.searching = false;

    vm.query = function (query)
    {
        vm.searching = true;
        ShowService.search(query).then(function (response)
        {
            //console.log("response is "+angular.fromJson(response));
            vm.results = response;
            $timeout(function ()
            {
                vm.searching = false;
            }, 500)
        }).catch(function (error)
        {
            console.log("error " + error);
        });
    }
    vm.trackShow = function (show) {
        StoreFactory.addShow(show);
    };

    vm.unTrackShow = function (id) {
        StoreFactory.removeShow(id);
    };

    vm.hasShow = function (id) {
        return (StoreFactory.getShow(id) !== false);
    };

});
