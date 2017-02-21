angular.module("validate",[])

.controller('validateCtrl', function($scope) {
    $scope.submitForm = function () {
        console.log("hello")
        $scope.submitted = true;
        if($scope.cList.$valid) {
             alert("form is valid");
        } else {
            alert("form is invalid");
        }
    }
})
