var bookListModule = angular.module('BookListModule',[]);

var newData;
bookListModule.controller('BookListCtrl', ['$scope', '$state', '$stateParams', 'bookListService', function($scope, $state,$stateParams,bookListService) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            // 现在就是从后台取数据。但是要去建立一个自己的服务来调数据，当然也可以用ng自带的服务
            bookListService($stateParams.bookType,function(data){
                $scope.setPagingData(data,page,pageSize);

            });
            // if (searchText) {
            //     var ft = searchText.toLowerCase();
            //     $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
            //         data = largeLoad.filter(function(item) {
            //             return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
            //         });
            //         $scope.setPagingData(data,page,pageSize);
            //     });
            // } else {
            //     $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
            //         $scope.setPagingData(largeLoad,page,pageSize);
            //     });
            // }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,

        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
    };
}]);

// 这里是书籍详情模块
// 用户处理bookDetail页面的数据和逻辑
var bookDetailModule = angular.module('BookDetailModule',[]);
bookDetailModule.controller('BookDetailCtrl', ['$scope', '$state', '$stateParams', 'bookDetailService', function($scope, $state, $stateParams, bookDetailService){
    setTimeout(function(){
        bookDetailService($stateParams.bookId,function(data){
            $scope.bookDetail = data[$stateParams.bookId-1];
        })
    })

}]);


//这里是处理addBookForm页模块

var addBookModule = angular.module('AddBookModule', []);
addBookModule.controller('AddBookCtrl', ['$scope', function($scope){
    // $scope.
    $scope
}])
