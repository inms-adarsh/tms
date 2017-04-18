(function () {
    'use strict';

    angular
        .module('app.shipments')
        .factory('shipmentService', shipmentService);

    /** @ngInject */
    function shipmentService($firebaseArray, $firebaseObject, $q, authService, auth, firebaseUtils, dxUtils, config) {
        var tenantId = authService.getCurrentTenant(),
            formInstance;
        // Private variables

        var service = {
            gridOptions: gridOptions,
            saveShipment: saveShipment,
            updateShipment: updateShipment,
            fetchShipmentList: fetchShipmentList,
            shipmentForm: shipmentForm
        };

        return service;

        //////////

        function shipmentForm() {
            var employeeData = {};
            var bookingStatus = [{
                "ID": 1,
                "Name": "HD Video Player",
                "Price": 330,
                "Current_Inventory": 225,
                "Backorder": 0,
                "Manufacturing": 10,
                "Category": "Video Players",
                "ImageSrc": "images/products/1-small.png"
            }, {
                "ID": 2,
                "Name": "SuperHD Player",
                "Price": 400,
                "Current_Inventory": 150,
                "Backorder": 0,
                "Manufacturing": 25,
                "Category": "Video Players",
                "ImageSrc": "images/products/2-small.png"
            }, {
                "ID": 3,
                "Name": "SuperPlasma 50",
                "Price": 2400,
                "Current_Inventory": 0,
                "Backorder": 0,
                "Manufacturing": 0,
                "Category": "Televisions",
                "ImageSrc": "images/products/3-small.png"
            }, {
                "ID": 4,
                "Name": "SuperLED 50",
                "Price": 1600,
                "Current_Inventory": 77,
                "Backorder": 0,
                "Manufacturing": 55,
                "Category": "Televisions",
                "ImageSrc": "images/products/4-small.png"
            }, {
                "ID": 5,
                "Name": "SuperLED 42",
                "Price": 1450,
                "Current_Inventory": 445,
                "Backorder": 0,
                "Manufacturing": 0,
                "Category": "Televisions",
                "ImageSrc": "images/products/5-small.png"
            }, {
                "ID": 6,
                "Name": "SuperLCD 55",
                "Price": 1350,
                "Current_Inventory": 345,
                "Backorder": 0,
                "Manufacturing": 5,
                "Category": "Televisions",
                "ImageSrc": "images/products/6-small.png"
            }, {
                "ID": 7,
                "Name": "SuperLCD 42",
                "Price": 1200,
                "Current_Inventory": 210,
                "Backorder": 0,
                "Manufacturing": 20,
                "Category": "Televisions",
                "ImageSrc": "images/products/7-small.png"
            }, {
                "ID": 8,
                "Name": "SuperPlasma 65",
                "Price": 3500,
                "Current_Inventory": 0,
                "Backorder": 0,
                "Manufacturing": 0,
                "Category": "Televisions",
                "ImageSrc": "images/products/8-small.png"
            }, {
                "ID": 9,
                "Name": "SuperLCD 70",
                "Price": 4000,
                "Current_Inventory": 95,
                "Backorder": 0,
                "Manufacturing": 5,
                "Category": "Televisions",
                "ImageSrc": "images/products/9-small.png"
            }, {
                "ID": 10,
                "Name": "DesktopLED 21",
                "Price": 175,
                "Current_Inventory": null,
                "Backorder": 425,
                "Manufacturing": 75,
                "Category": "Monitors",
                "ImageSrc": "images/products/10-small.png"
            }, {
                "ID": 11,
                "Name": "DesktopLED 19",
                "Price": 165,
                "Current_Inventory": 425,
                "Backorder": 0,
                "Manufacturing": 110,
                "Category": "Monitors",
                "ImageSrc": "images/products/11-small.png"
            }, {
                "ID": 12,
                "Name": "DesktopLCD 21",
                "Price": 170,
                "Current_Inventory": 210,
                "Backorder": 0,
                "Manufacturing": 60,
                "Category": "Monitors",
                "ImageSrc": "images/products/12-small.png"
            }, {
                "ID": 13,
                "Name": "DesktopLCD 19",
                "Price": 160,
                "Current_Inventory": 150,
                "Backorder": 0,
                "Manufacturing": 210,
                "Category": "Monitors",
                "ImageSrc": "images/products/13-small.png"
            }, {
                "ID": 14,
                "Name": "Projector Plus",
                "Price": 550,
                "Current_Inventory": null,
                "Backorder": 55,
                "Manufacturing": 10,
                "Category": "Projectors",
                "ImageSrc": "images/products/14-small.png"
            }, {
                "ID": 15,
                "Name": "Projector PlusHD",
                "Price": 750,
                "Current_Inventory": 110,
                "Backorder": 0,
                "Manufacturing": 90,
                "Category": "Projectors",
                "ImageSrc": "images/products/15-small.png"
            }, {
                "ID": 16,
                "Name": "Projector PlusHT",
                "Price": 1050,
                "Current_Inventory": 0,
                "Backorder": 75,
                "Manufacturing": 57,
                "Category": "Projectors",
                "ImageSrc": "images/products/16-small.png"
            }, {
                "ID": 17,
                "Name": "ExcelRemote IR",
                "Price": 150,
                "Current_Inventory": 650,
                "Backorder": 0,
                "Manufacturing": 190,
                "Category": "Automation",
                "ImageSrc": "images/products/17-small.png"
            }, {
                "ID": 18,
                "Name": "ExcelRemote BT",
                "Price": 180,
                "Current_Inventory": 310,
                "Backorder": 0,
                "Manufacturing": 0,
                "Category": "Automation",
                "ImageSrc": "images/products/18-small.png"
            }, {
                "ID": 19,
                "Name": "ExcelRemote IP",
                "Price": 200,
                "Current_Inventory": 0,
                "Backorder": 325,
                "Manufacturing": 225,
                "Category": "Automation",
                "ImageSrc": "images/products/19-small.png"
            }];
            var shipmentForm = {
                formData: {},
                colCount: 2,
                onInitialized: function (e) {
                    formInstance = e.component;
                },
                items: [{
                    itemType: "group",
                    caption: "Booking Information",
                    colSpan: 2,
                    colCount: 2,
                    items: [{
                        dataField: 'status',
                        label: {
                            text: 'Shipment Status'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            dataSource: bookingStatus,
                            displayExpr: "Name",
                            valueExpr: "ID",
                            onValueChanged: function (e) {
                                formInstance.updateData('contactRef', 'Adarsh');
                            }
                        }
                    }, {
                        dataField: 'bookingDate',
                        label: {
                            text: 'Booking Date'
                        },
                        editorType: 'dxDateBox'
                    }, {
                        dataField: 'contactRef',
                        label: {
                            text: 'Contact'
                        },
                        editorType: 'dxTextBox'
                    }, {
                        dataField: 'chargeTo',
                        label: {
                            text: 'Charge To'
                        },
                        editorType: 'dxSelectBox'
                    }, {
                        dataField: 'shipper',
                        label: {
                            text: 'Shipper'
                        },
                        editorType: 'dxSelectBox'
                    }, {
                        dataField: 'requestedPickupDate',
                        label: {
                            text: 'Required Pickup'
                        },
                        editorType: 'dxDateBox'
                    }, {
                        dataField: 'requestedDeliveryDate',
                        label: {
                            text: 'Required Delivery'
                        },
                        editorType: 'dxDateBox'
                    }]
                }, {
                    itemType: "group",
                    caption: "Consignor",
                    items: [{
                        dataField: 'consignor',
                        label: {
                            text: 'Select Consignor'
                        },
                        editorType: 'dxSelectBox'
                    }, "Phone", "Address", "City", "State", "Zipcode"]
                }, {
                    itemType: "group",
                    caption: "Consignee",
                    items: [{
                        dataField: 'consignee',
                        label: {
                            text: 'Select Consignee'
                        },
                        editorType: 'dxSelectBox'
                    },
                        "Phone", "Address", "City", "State", "Zipcode"]
                }, {
                    itemType: "group",
                    caption: "Contact Information",
                    colSpan: 2,
                    items: [{
                        itemType: "tabbed",
                        tabPanelOptions: {
                            deferRendering: false
                        },
                        tabs: [{
                            title: "Items",
                            items: ["Phone"]
                        }, {
                            title: "Charges",
                            items: ["Skype"]
                        }, {
                            title: "Documents",
                            items: ["Email"]
                        }]
                    }]
                }]
            };
            return shipmentForm;
        }
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
                        mode: 'form',
                        form: shipmentForm()
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