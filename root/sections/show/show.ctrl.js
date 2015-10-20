angular.module('app.core').controller('ShowController', function (data, seasons, ShowService) {
    var vm = this;
    vm.data = data;
    vm.newEntry = {};
    vm.seasons = seasons;
    vm.episodes = [];
    vm.gettingEpisodes = false;
    vm.wordCounter = 10;


    vm.getEpisodes = function () {
        vm.gettingEpisodes = true;
        ShowService.getSeason(vm.data.id, vm.newEntry.seasonNumber).then(function (response) {
            vm.episodes = response.episodes;
            vm.gettingEpisodes = false;
        });
    };
    vm.saveEntry = function () {
        if (vm.data.diary_entries == undefined) {
            vm.data.diary_entries = [];
        }
        vm.newEntry.date = new Date();
        vm.data.diary_entries.push(vm.newEntry);
        vm.newEntry = {};
    };
    vm.removeEntry = function ($index) {
        vm.data.diary_entries.splice($index, 1);
    };

    vm.setWordCounter = function (_event)
    {
        var maxStr = _event.currentTarget.attributes.getNamedItem('min-words').nodeValue;
        var max = parseInt(maxStr);
        
        //this is tied to the form and $viewValue is the temp buffer before validation
        var currentVal = vm.newEntryForm.entry.$viewValue;
        var words = [];
        if (!currentVal)
        {
            console.log("a0");
        }
        else
        {
            words = currentVal.split(' ');
            console.log("a1 "+currentVal)
            if (max - words.length >= 0)
            {
                 vm.wordCounter = max - words.length;
            }
            else
            {
                 vm.wordCounter = 0;
            }
            console.log("vm counter "+vm.wordCounter);
        }
         
    };

    


});
