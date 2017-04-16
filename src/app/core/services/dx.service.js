(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dxUtils', dxUtils);

    /** @ngInject */
    function dxUtils($window, $q) {
        // Private variables

        var service = {
            createGrid: createGrid
        };

        return service;

        //////////

        /**
         * Return default grid Configuration
         */
        function createGrid(datasource) {
            var gridOptions = {
                loadPanel: {
                    enabled: true
                },
                scrolling: {
                    mode: 'virtual'
                },
                headerFilter: {
                    visible: false
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: 'Search...'
                },
                columnChooser: {
                    enabled: true
                },
                editing: {
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true,
                    mode: 'batch'
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always'
                },
                onContentReady: function (e) {
                    e.component.option('loadPanel.enabled', false);
                },
                stateStoring: {
                    enabled: true,
                    type: 'localStorage',
                    storageKey: 'storage'
                },
                showColumnLines: true,
                showRowLines: true,
                showBorders: false,
                rowAlternationEnabled: false
            };
            return gridOptions;

        }


    }
}());