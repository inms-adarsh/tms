(function ()
{
    'use strict';

    angular
        .module('app.admin.drivers',
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
            .state('app.admin.drivers', {
                abstract: true,
                url     : '/drivers'
            })
            .state('app.admin.drivers.list', {
                url      : '/list',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/drivers/views/list-view/drivers.html',
                        controller : 'driversController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('drivers.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('drivers.statuses@get');
                    }
                },
                bodyClass: 'drivers'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/drivers');

        // Api
        msApiProvider.register('drivers.dashboard', ['app/data/e-commerce/dashboard.json']);
        msApiProvider.register('drivers.products', ['app/data/e-commerce/products.json']);
        msApiProvider.register('drivers.product', ['app/data/e-commerce/product.json']);
        msApiProvider.register('drivers.orders', ['app/data/e-commerce/orders.json']);
        msApiProvider.register('drivers.statuses', ['app/data/e-commerce/statuses.json']);
        msApiProvider.register('drivers.order', ['app/data/e-commerce/order.json']);

        // Navigation
       
        msNavigationServiceProvider.saveItem('admin.drivers', {
            title: 'drivers',
            state: 'app.admin.drivers.list'
        });
    }
})();