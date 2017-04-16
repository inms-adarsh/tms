(function () {
    'use strict';

    angular
        .module('app.shipments')
        .factory('shipmentService', shipmentService);

    /** @ngInject */
    function shipmentService($firebaseArray, $firebaseObject, $q, authService, auth, firebaseUtils, dxUtils, config) {
        var tenantId = authService.getCurrentTenant();
        // Private variables

        var service = {
            gridOptions: gridOptions,
            saveShipment: saveShipment,
            updateShipment: updateShipment,
            fetchShipmentList: fetchShipmentList
        };

        return service;

        //////////

        /**
         * Grid Options for shipment list
         * @param {Object} dataSource 
         */
        function gridOptions(dataSource) {
            var gridOptions = dxUtils.createGrid(),
                otherConfig = {
                    dataSource: {
                        load: function () {
                            var defer = $q.defer();
                            fetchShipmentList().then(function (data) {
                                defer.resolve(data);
                            });
                            return defer.promise;
                        },
                        insert: function (shipmentObj) {
                            saveShipment(shipmentObj);
                        },
                        update: function (key, shipmentObj) {
                            updateShipment(key, shipmentObj);
                        },
                        remove: function (key) {
                            deleteShipment(key);
                        }
                    },
                    summary: {
                        totalItems: [{
                            column: 'name',
                            summaryType: 'count'
                        }]
                    },
                    editing: {
                        allowAdding: true,
                        allowUpdating: true,
                        allowDeleting: true,
                        mode: 'form'
                    },
                    columns: config.shipmentGridCols(),
                    export: {
                        enabled: true,
                        fileName: 'Shipments',
                        allowExportSelectedData: true
                    },
                    onToolbarPreparing: function (e) {
                        var dataGrid = e.component;

                        e.toolbarOptions.items.unshift({
                                location: "before",
                                widget: "dxSelectBox",
                                options: {
                                    width: 200,
                                    items: [{
                                        value: "CustomerStoreState",
                                        text: "Grouping by State"
                                    }, {
                                        value: "Employee",
                                        text: "Grouping by Employee"
                                    }],
                                    displayExpr: "text",
                                    valueExpr: "value",
                                    value: "CustomerStoreState",
                                    onValueChanged: function (e) {
                                        dataGrid.clearGrouping();
                                        dataGrid.columnOption(e.value, "groupIndex", 0);
                                    }
                                }
                            }, {
                                location: "before",
                                widget: "dxButton",
                                options: {
                                    hint: "Collapse All",
                                    icon: "chevrondown",
                                    onClick: function (e) {
                                        var expanding = e.component.option("icon") === "chevronnext";
                                        dataGrid.option("grouping.autoExpandAll", expanding);
                                        e.component.option({
                                            icon: expanding ? "chevrondown" : "chevronnext",
                                            hint: expanding ? "Collapse All" : "Expand All"
                                        });
                                    }
                                }
                            }, {
                                location: "after",
                                widget: "dxButton",
                                options: {
                                    icon: "refresh",
                                    onClick: function () {
                                        dataGrid.refresh();
                                    }
                                }
                            });
                    }

                };

            angular.extend(gridOptions, otherConfig);
            return gridOptions;
        };

        /**
         * Save form data
         * @returns {Object} Shipment Form data
         */
        function saveShipment(shipmentObj) {
            var ref = rootRef.child('tenant-shipments').child(tenantId);
            shipmentObj.user = auth.$getAuth().uid;
            return firebaseUtils.addData(ref, shipmentObj);
        }

        /**
         * Fetch shipment list
         * @returns {Object} Shipment data
         */
        function fetchShipmentList() {
            var ref = rootRef.child('tenant-shipments').child(tenantId).orderByChild('deactivated').equalTo(null);
            return firebaseUtils.fetchList(ref);
        }

        /**
         * Fetch shipment list
         * @returns {Object} Shipment data
         */
        function updateShipment(key, shipmentData) {
            var ref = rootRef.child('tenant-shipments').child(tenantId).child(key['$id']);
            return firebaseUtils.updateData(ref, shipmentData);
        }

        /**
         * Delete Shipment
         * @returns {Object} shipment data
         */
        function deleteShipment(key) {
            var ref = rootRef.child('tenant-shipments').child(tenantId).child(key['$id']);
            return firebaseUtils.updateData(ref, { deactivated: false });
        }

    }
}());