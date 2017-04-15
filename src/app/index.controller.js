(function ()
{
    'use strict';

    angular
        .module('tms')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////
    }
})();