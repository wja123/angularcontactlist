'use strict';

var app = angular.module("contApp", []);
var edIndex;

app.controller("main-controller", function($scope, $http) {
    console.log("main-controller loaded.");

    updateData();

    function updateData() {
        $http({
            method: "GET",
            url: "http://localhost:8000/getcontacts"
        }).then(function(res) {
            console.log("GET Success");
            $scope.contactList = res.data;
        }, function(err) {
            console.log(err);
        });
    }


    $scope.addContact = function() {
        var newCont = angular.copy($scope.newcontact);
        $scope.contactList.push(newCont);
        $http({
            method: "POST",
            data: newCont,
            url: "http://localhost:8000/addcontact"
        }).then(function(res) {
            console.log("POST Success!");
        }, function(err) {
            console.log(err);
        });
    };


    $scope.clickRemove = function() {
        var indexVal = this.$index;
        $http({
            method: "DELETE",
            url: "http://localhost:8000/deletecontact/" + this.$index
        }).then(function(res) {
            $scope.contactList.splice(indexVal, 1);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.clickEdit = function() {
        edIndex = this.$index;
        $(".upname").val($scope.contactList[this.$index].name);
        $(".upphone").val($scope.contactList[this.$index].phone);
        $(".upemail").val($scope.contactList[this.$index].email);
        $(".upname").trigger('input');
        $(".upphone").trigger('input');
        $(".upemail").trigger('input');

    };

    $scope.clickUpdate = function() {
        var addCont = angular.copy($scope.updateval);
        $http({
            method: "PUT",
            data: addCont,
            url: "http://localhost:8000/updatecontact/" + edIndex
        }).then(function(res) {
            $scope.contactList[edIndex] = addCont;
            edIndex = "";
            updateData();
        }, function(err) {
            console.log(err);
        });
    };



});