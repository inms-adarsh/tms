(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('config', config);

    /** @ngInject */
    function config($window, $q) {
        // Private variables

        var service = {
            driverGridCols: driverGridCols,
            customerGridCols: customerGridCols,
            containerGridCols: containerGridCols,
            locationGridCols: locationGridCols,
            shipmentGridCols: shipmentGridCols,
            shipmentForm: shipmentForm
        };

        return service;

        //////////

        /**
         * Return driver columns Configuration
         */
        function driverGridCols(datasource) {
            var gridCols = [{
                dataField: 'name',
                caption: 'Name',
                validationRules: [{
                    type: 'required',
                    message: 'Name is required'
                }]
            }, {
                dataField: 'phone',
                caption: 'Phone',
                validationRules: [{
                    type: 'required',
                    message: 'Phone number is required'
                }],
                editorOptions: {
                    mask: '0000000000'
                }
            }, {
                dataField: 'email',
                caption: 'Email',
                validationRules: [{
                    type: 'email',
                    message: 'Please enter valid e-mail address'
                }]
            }, {
                dataField: 'alias',
                caption: 'Short Name'
            }, {
                dataField: 'licenceNo',
                caption: 'Licence No'
            }, {
                dataField: 'adress',
                caption: 'Address'
            }, {
                dataField: 'city',
                caption: 'City'
            }, {
                dataField: 'state',
                caption: 'State'
            }, {
                dataField: 'zipcode',
                caption: 'ZIP/Pincode',
                editorOptions: {
                    mask: '000000'
                }
            }];
            return gridCols;

        }

        /**
         * Return customer columns Configuration
         */
        function customerGridCols() {
            var gridCols = [{
                dataField: 'name',
                caption: 'Name',
                validationRules: [{
                    type: 'required',
                    message: 'Name is required'
                }]
            }, {
                dataField: 'phone',
                caption: 'Phone',
                validationRules: [{
                    type: 'required',
                    message: 'Phone number is required'
                }],
                editorOptions: {
                    mask: '0000000000'
                }
            }, {
                dataField: 'email',
                caption: 'Email',
                validationRules: [{
                    type: 'email',
                    message: 'Please enter valid e-mail address'
                }]
            }, {
                dataField: 'alias',
                caption: 'Short Name'
            }, {
                dataField: 'gstno',
                caption: 'GST No',
                editorOptions: {
                    mask: '00AAAAAAAAAA0A0'
                }
            }, {
                dataField: 'adress',
                caption: 'Address'
            }, {
                dataField: 'city',
                caption: 'City'
            }, {
                dataField: 'state',
                caption: 'State'
            }, {
                dataField: 'zipcode',
                caption: 'ZIP/Pincode',
                editorOptions: {
                    mask: '000000'
                }
            }];
            return gridCols;
        }

        function containerGridCols() {
            var gridCols = [{
                dataField: 'name',
                caption: 'Name',
                validationRules: [{
                    type: 'required',
                    message: 'Name is required'
                }]
            }, {
                dataField: 'phone',
                caption: 'Phone',
                validationRules: [{
                    type: 'required',
                    message: 'Phone number is required'
                }],
                editorOptions: {
                    mask: '0000000000'
                }
            }, {
                dataField: 'email',
                caption: 'Email',
                validationRules: [{
                    type: 'email',
                    message: 'Please enter valid e-mail address'
                }]
            }, {
                dataField: 'alias',
                caption: 'Short Name'
            }, {
                dataField: 'gstno',
                caption: 'GST No',
                editorOptions: {
                    mask: '00AAAAAAAAAA0A0'
                }
            }, {
                dataField: 'adress',
                caption: 'Address'
            }, {
                dataField: 'city',
                caption: 'City'
            }, {
                dataField: 'state',
                caption: 'State'
            }, {
                dataField: 'zipcode',
                caption: 'ZIP/Pincode',
                editorOptions: {
                    mask: '000000'
                }
            }];
            return gridCols;
        }

        function locationGridCols() {
            var gridCols = [{
                dataField: 'name',
                caption: 'Name',
                validationRules: [{
                    type: 'required',
                    message: 'Name is required'
                }]
            }, {
                dataField: 'phone',
                caption: 'Phone',
                validationRules: [{
                    type: 'required',
                    message: 'Phone number is required'
                }],
                editorOptions: {
                    mask: '0000000000'
                }
            }, {
                dataField: 'email',
                caption: 'Email',
                validationRules: [{
                    type: 'email',
                    message: 'Please enter valid e-mail address'
                }]
            }, {
                dataField: 'alias',
                caption: 'Short Name'
            }, {
                dataField: 'gstno',
                caption: 'GST No',
                editorOptions: {
                    mask: '00AAAAAAAAAA0A0'
                }
            }, {
                dataField: 'adress',
                caption: 'Address'
            }, {
                dataField: 'city',
                caption: 'City'
            }, {
                dataField: 'state',
                caption: 'State'
            }, {
                dataField: 'zipcode',
                caption: 'ZIP/Pincode',
                editorOptions: {
                    mask: '000000'
                }
            }];
            return gridCols;
        }

        var formats = [
            { id: 1, format: 'hardcover' },
            { id: 2, format: 'paperback' },
            { id: 3, format: 'e-book' },
        ];
        function shipmentGridCols() {
            var gridCols = [{
                dataField: 'name',
                caption: 'Name',
                validationRules: [{
                    type: 'required',
                    message: 'Name is required'
                }]
            }, {
                dataField: 'phone',
                caption: 'Phone',
                validationRules: [{
                    type: 'required',
                    message: 'Phone number is required'
                }],
                editorOptions: {
                    mask: '0000000000'
                }
            }, {
                dataField: 'email',
                caption: 'Email',
                validationRules: [{
                    type: 'email',
                    message: 'Please enter valid e-mail address'
                }]
            }, {
                dataField: 'alias',
                caption: 'Short Name'
            }, {
                dataField: 'gstno',
                caption: 'GST No',
                editorOptions: {
                    mask: '00AAAAAAAAAA0A0'
                }
            }, {
                dataField: 'adress',
                caption: 'Address'
            }, {
                dataField: 'city',
                caption: 'City', 
                lookup: { dataSource: formats, valueExpr: 'id', displayExpr: 'format' }
            }, {
                dataField: 'state',
                caption: 'State'
            }, {
                dataField: 'zipcode',
                caption: 'ZIP/Pincode',
                editorOptions: {
                    mask: '000000'
                }
            }];
            return gridCols;
        }

        function shipmentForm() {
            var formOptions = [];

            return formOptions;
        }
    }
}());