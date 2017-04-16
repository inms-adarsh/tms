(function ()
{
    'use strict';

    angular
        .module('app.auth', [
            'app.auth.login',
            'app.auth.register',
            'app.auth.forgot-password',
            'app.auth.reset-password',
            'app.auth.lock',
            'app.auth.tenant'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        
    }
})();