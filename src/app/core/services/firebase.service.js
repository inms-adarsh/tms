(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('firebaseUtils', firebaseUtils);

    /** @ngInject */
    function firebaseUtils($window, $q, $firebaseArray, $firebaseObject)
    {
        // Private variables
        var mobileDetect = new MobileDetect($window.navigator.userAgent),
            browserInfo = null;

        var service = {
            fetchList: fetchList,
            updateData: updateData,
            getItemByRef: getItemByRef,
            addData     : addData
        };

        return service;

        //////////

        /**
         * Return list based on firebase ref
         *
         * @param item
         * @param list
         * @returns {boolean}
         */
        function fetchList(ref)
        {
            var defer = $q.defer(),
                list = $firebaseArray(ref);

            list.$loaded().then(function (data) {
                defer.resolve(data);
            }).catch(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        /**
         * Update firebase ref
         */
        function updateData(ref, updateData)
        {   
            var defer = $q.defer();
            ref.update(updateData, function(err) { 
                if(err) {
                    defer.reject(err);
                } else {
                    defer.resolve(updateData);
                }
            });

            return defer.promise;
        }   

        /**
         * get firebase item by id
         */
        function getItemByRef(ref)
        {   
            var defer = $q.defer(),
                obj = $firebaseObject(ref);

            obj.$loaded().then(function(data) {
                defer.resolve(data);
            }).catch(function(err) {
                defer.reject(err);
            });

            return defer.promise;
        }   

        /**
         * Add data
         *
         */
        function addData(ref, saveData)
        {
            var def = $q.defer();

            $firebaseArray(ref).$add(saveData).then(function(ref) {
                if (ref.key) {
                    def.resolve(ref.key);
                }
            }).catch(function(err) {
                def.reject(err);
            });

            return def.promise;
        }

    }
}());