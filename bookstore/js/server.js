
// 请求数据

var httpPrefix = './';
function doRequest(path, $http){
	return $http({
	  method: 'GET',
	  url: httpPrefix + path
	})
}
// 错误解决
// function doerror(){
// 	$http({
// 	  method: 'GET',
// 	  url: '/someUrl'
// 	}).then(function successCallback(response) {
// 	    // this callback will be called asynchronously
// 	    // when the response is available
// 	  }, function errorCallback(response) {
// 	    // called asynchronously if an error occurs
// 	    // or server returns response with an error status.
// 	  });
// }


bookListModule.factory('bookListService', ['$http', function($http) {
  	return function (bookType,callback) {
    	 doRequest('data/books' + bookType + '.json', $http)
    	 .then(function successCallback(response) {
	 	    	callback(response.data)
	 	  }, function errorCallback(response) {
	 	    console.log(response.status)
	 	  });
  };
}])

bookDetailModule.factory('bookDetailService', ['$http', function($http){
	return function (bookId, callback){
		doRequest('data/books0.json', $http)
		.then(function successCallback(response) {
	 	    	callback(response.data)
	 	  }, function errorCallback(response) {
	 	    console.log(response.status)
	 	  });
	};
}])

