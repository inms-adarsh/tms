(function () {
    'use strict';

    angular
        .module('app.admin.customers')
        .factory('customerService', customerService);

    /** @ngInject */
    function customerService($firebaseArray, $firebaseObject, authService, auth, $q, firebaseUtils) {
        var tenantId = authService.getCurrentTenant();
        // Private variables

        var service = {
            formOptions: formOptions,
            gridOptions: gridOptions,
            saveCustomer: saveCustomer,
            updateCustomer: updateCustomer,
            fetchCustomerList: fetchCustomerList
        };

        return service;

        //////////

        /**
         * Return form Item Configuration
         * @returns {Object} Item configuration
         */
        function formOptions() {
            var formOptionsItems = {

                bindingOptions: {
                    formData: 'vm.customers'
                },
                colCount: 2,
                items: [{
                    dataField: "name",
                    label: {
                        text: "Name"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Name is required"
                    }]
                }, {
                    dataField: "phone",
                    label: {
                        text: "Phone"
                    },
                    editorOptions: {
                        mask: "0000000000"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Phone number is required"
                    }]
                }, {
                    dataField: "email",
                    label: {
                        text: "Email"
                    },
                    validationRules: [{
                        type: "email",
                        message: "Please enter valid e-mail address"
                    }]
                }, {
                    dataField: "alias",
                    label: {
                        text: "Short Name"
                    }
                }, {
                    dataField: "gstno",
                    label: {
                        text: "GST No"
                    },
                    editorOptions: {
                        mask: "00AAAAAAAAAA0A0"
                    }
                }, {
                    dataField: "adress",
                    label: {
                        text: "Address"
                    }
                }, {
                    dataField: "city",
                    label: {
                        text: "City"
                    }
                }, {
                    dataField: "state",
                    label: {
                        text: "State"
                    }
                }, {
                    dataField: "zipcode",
                    label: {
                        text: "ZIP/Pincode"
                    },
                    editorOptions: {
                        mask: "000000"
                    }
                }],
                onContentReady: function () {
                    var dxFormInstance = $('#customer-form').dxForm('instance');
                }
            };
            return formOptionsItems;
        }

        /**
         * Grid Options for customer list
         * @param {Object} dataSource 
         */
        function gridOptions(dataSource) {
            var gridOptions = {
                dataSource: {
                    load: function() {
                        var defer = $q.defer();
                        fetchCustomerList().then(function(data) {
                            defer.resolve(data);
                        });
                        return defer.promise;
                    },
                    insert: function(customerObj) {
                        saveCustomer(customerObj);
                    },
                    update: function(key, customerObj) {
                        updateCustomer(key, customerObj);
                    },
                    remove: function(key) {
                        deleteCustomer(key);
                    }
                },
                loadPanel: {
                    enabled: true
                },
                scrolling: {
                    mode: "virtual"
                },
                headerFilter: {
                    visible: false
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Search..."
                },
                "export": {
                    enabled: true,
                    fileName: "Customers",
                    allowExportSelectedData: true
                },
                columnChooser: {
                    enabled: true
                },
                editing: {
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true,
                    mode: "batch",
                    form: formOptions()
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always'
                },
                columns: formOptions().items,
                onContentReady: function (e) {
                    e.component.option("loadPanel.enabled", false);
                },
                summary: {
                    totalItems: [{
                        column: "name",
                        summaryType: "count"
                    }]
                },
                stateStoring: {
                    enabled: true,
                    type: "localStorage",
                    storageKey: "storage"
                },
                showColumnLines: true,
                showRowLines: true,
                showBorders: false,
                rowAlternationEnabled: false
            };
            return gridOptions;
        };

        /**
         * Save form data
         * @returns {Object} Customer Form data
         */
        function saveCustomer(customerObj) {
            var ref = rootRef.child('tenant-customers').child(tenantId);
            customerObj.user = auth.$getAuth().uid;
            return firebaseUtils.addData(ref, customerObj);
        }

        /**
         * Fetch customer list
         * @returns {Object} Customer data
         */
        function fetchCustomerList() {
            var ref = rootRef.child('tenant-customers').child(tenantId);
            return firebaseUtils.fetchList(ref);
        }

        /**
         * Fetch customer list
         * @returns {Object} Customer data
         */
        function updateCustomer(key, customerData) {
            var ref = rootRef.child('tenant-customers').child(tenantId).child(key['$id']);
            return firebaseUtils.updateData(ref, customerData);
        }


    }
}());