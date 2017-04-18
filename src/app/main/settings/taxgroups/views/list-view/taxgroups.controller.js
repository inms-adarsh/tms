(function ()
{
    'use strict';

    angular
        .module('app.settings.taxgroups')
        .controller('TaxgroupsController', TaxgroupsController);

    /** @ngInject */
    function TaxgroupsController($state, $scope, $mdDialog, $document, $q, taxService, taxgroupService)
    {
        var vm = this;

        // Data
        
        // Methods
        init();
        //////////

        function init() {
           var defer = $q.defer();
            taxService.fetchTaxList().then(function (data) {
                vm.taxData = data;
                vm.taxgroupGridOptions = taxgroupService.gridOptions('vm.taxgroups');
                vm.taxDataGridOptions = taxgroupService.taxGrid('vm.taxData');
            });
            return defer.promise;
        }

    }
})();