(function ()
{
    'use strict';

    /**
     * Main module of the tms
     */
    angular
        .module('tms', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // Authentication
            'app.auth',

            //Freight Management
            'app.e-commerce',

            //Firebase
            'firebase',

            //Email
            //'app.mail',

            //Admin
            'app.admin'
        ]);
})();