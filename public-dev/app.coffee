angular.module('airfragger', ['ngResource'])
.factory 'FeedApi', ['$resource', ($resource)->

  Feed = $resource '/api/feed/:id', id: '@id',
    byType:
      url: '/api/feed/type/:type'
      isArray: true
      method: 'GET'


  get_all = (next)->
    Feed.query (items)->
      out = []
      for item in items then out.push item
      next out
      return
    return


  getAll: get_all
  FeedAPI: Feed

]
.directive 'feedAccount', ()->

  templateUrl: '/partials/directives/feed_account.html'
  replace: true
  scope:
    feed: '@'
  controller: ($scope)->
    $scope.data = $scope.feed
    return

.controller 'FeedController', ['$scope', 'FeedApi', ($scope, FeedApi)->
  $scope.feed = []
  #socket = io.connect('http://localhost:8889/')

  FeedApi.getAll (items)->
    $scope.feed = items

    console.log items
    return

  return
]