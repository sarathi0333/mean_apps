var app = angular.module('cList',['validate']);
app.controller('cListCtrl',function ($scope,$http) {
	$scope.itemPerPage = 4;
	$scope.currentPage = 1;
	
	$scope.prev = function () {
        $scope.currentPage = $scope.currentPage - 1;
    };

    $scope.next = function () {
        $scope.currentPage = $scope.currentPage + 1;
    };
	$scope.validate = function() {
		if($scope.contact.name =='' || $scope.contact.email == '' || $scope.contact.phone == ''){
			return false;
		} else {return true;}
	}
var refresh = function() {
	$http.get('/contactlist').then(function(response) {
		$scope.contactlist = response.data;
		console.log($scope.contactlist);
		$scope.contact = {};
		$scope.numberOfPages = Math.round($scope.contactlist.length / $scope.itemPerPage);
	});
};

refresh();
	$scope.addContact = function() {
		console.log("addContact function called")
		if(!$scope.contact){} else {
		$http.post('/contactlist', $scope.contact).then(function(response) {
			console.log(response);
			refresh();
		});
	}
	}

	$scope.removeContact = function(id) {
		console.log(id);
		$http.delete('/contactlist/'+id).then(function(response) {
			refresh();
		});
	}
	$scope.editContact = function(id) {
		console.log("edit method.. called")
		$http.get('/contactlist/'+ id).then(function(response) {
			$scope.contact = response.data;
			console.log($scope.contact);
		});
	}
	$scope.updateContact = function() {
		console.log($scope.contact._id); // puts the id of the contact in the input boxes
		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).then(function (response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = {};
	}

	 //$scope.numberOfPages = Math.round($scope.contactlist.length / $scope.itemPerPage);
});

app.filter('startFrom', function () {
    return function (input, start) {
         if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);

    }
});

app.directive('addIfen', function() {
	return{
		restrict:"A",
		link: function (scope, element, attrs) {
			var count = 0, count1 = 0;
            scope.$watch(attrs.ngModel, function (val) {
            	if(count1!=2) {
            		if(count == 3) {
            		var result = val+"-";
            		element.val(result);
            		count1++;
            		count=0; 
            	} 
            	count++;
            	}
            });
        }

	};
})
