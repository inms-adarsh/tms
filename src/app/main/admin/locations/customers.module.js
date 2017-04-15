(function ()
{
    'use strict';

    angular
        .module('app.admin.locations',
            [
                // 3rd Party Dependencies
                'dx'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.admin.locations', {
                abstract: true,
                url     : '/locations'
            })
            .state('app.admin.locations.list', {
                url      : '/list',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/locations/views/list-view/locations.html',
                        controller : 'locationsController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('locations.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('locations.statuses@get');
                    }
                },
                bodyClass: 'locations'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/locations');

        // Api
        msApiProvider.register('locations.dashboard', ['app/data/e-commerce/dashboard.json']);
        msApiProvider.register('locations.products', ['app/data/e-commerce/products.json']);
        msApiProvider.register('locations.product', ['app/data/e-commerce/product.json']);
        msApiProvider.register('locations.orders', ['app/data/e-commerce/orders.json']);
        msApiProvider.register('locations.statuses', ['app/data/e-commerce/statuses.json']);
        msApiProvider.register('locations.order', ['app/data/e-commerce/order.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('admin.locations', {
            title: 'locations',
            state: 'app.admin.locations.list'
        });
    }
})();