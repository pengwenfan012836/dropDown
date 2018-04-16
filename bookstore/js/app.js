var appModule = angular.module('routerApp',['ui.router','ngGrid', 'BookListModule', 'BookDetailModule', 'AddBookModule']);



appModule.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
// 配置router
appModule.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
    .state('index',{
        url:'/index',
        views:{
            '':{
                templateUrl: 'tpls/home.html'
            },
            'main@index':{
                templateUrl: 'tpls/login.html'
            }
        }
    })
    .state('booklist',{
        url:'/{bookType:[0-9]{1,4}}',
        views:{
            '':{
                templateUrl: 'tpls/bookList.html'
            },
            'bookType@booklist':{
                templateUrl: 'tpls/bookType.html'
            },
            'bookGrid@booklist':{
                templateUrl: 'tpls/bookGrid.html'
            }
        }
    })
    .state('bookdetail',{
        url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
        templateUrl: 'tpls/bookDetail.html'
       
    })
    .state('addbook',{
        url: '/addbook',
        templateUrl: 'tpls/addBookForm.html'
    })

})
