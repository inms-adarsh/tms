(function ()
{
    'use strict';

    angular
        .module('app.admin', [
            'app.admin.customers',
            'app.admin.drivers',
            'app.admin.locations',
            'app.admin.containers'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('admin', {
            title : 'Admin',
            group : true,
            weight: 2
        });

    }
})();