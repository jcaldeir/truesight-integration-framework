/**
 * New node file
 */


var Controllers = angular.module('Controllers', []);
 
KitControllers.controller('ParametersListCtrl', ['$scope', 'Parameters', function($scope, Parameters) {
	 	
	$scope.refresh = function() {
		 
		 $scope.parameters = Parameters.query();
		 
		 //console.log("Parameters Refresh" , $scope.parameters);
		   
	   };
	   
	 
	$scope.update = function(parameter) {
					
		$scope.parameters.forEach(function (parameter) 
			 {				 
		   	  
			  param = new Parameters(parameter); 
		      
			  //console.log("Update Parameter Print" , parameter);  
			  			  
		      param.$save(function(data,headers)
		                {
		    	  	    	console.log("Update Print" , data);  
		    	  			
		                },
		                
		                function(err,headers)
		                {
		    	  			console.log("Update Error" , err);  
		                })
		    
			});
		
		};
		
		//$scope.orderProp = 'age';
		
		$scope.print = function() {
	 		 
			 console.log("Parameters Print" , $scope.parameters);
			   
		};

}]);

