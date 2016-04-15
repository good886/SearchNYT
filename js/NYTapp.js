var myApp = angular.module("myApp",[]);

// search form
myApp.directive("textSearch", function($http){
  return {
    restrict: "A",
    link: function(scope,elem,attrs){
      
			var $element = angular.element(elem);
     
      $element.bind("submit", function(e){
        
        e.preventDefault();
        
        var searchTerm = document.getElementById("searchTerm").value,
            authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
            queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=",
            //imageSearchUrl = "http://www.splashbase.co/api/v1/images/search?query=",
            fullQuery = queryURLBase+searchTerm,
            searchResult = {};
        
        		scope.searchedText = "";
        		scope.noResults = false;


        
            $http.get(fullQuery).
              success(function(data, status, headers, config) {
              console.log(data.response.docs);

          // Log the remaining fields to console as well
          /*console.log(data.response.docs[0].pub_date);
          console.log(data.response.docs[0].section_name);*/
          console.log(data.response.docs[0].web_url);

              	if(data){
              		scope.searchedText = data.docs;
                }else{
                  scope.noResults = true;
                }
              }).
              error(function(data, status, headers, config) {
                console.log(data.response.docs.length);
              });
        
      });
      
      
    }
  }
});


    
myApp.controller("ArtCtrl",function ($scope) {
     $scope.data = 1;
});



// random background image
myApp.factory("bgImage", function($http){
  
  var bgImage = {},
  remoteAPI = "http://www.splashbase.co/api/v1/images/random";
  
  bgImage.getImages = function(){
    return $http({
      method: "GET",
      url: remoteAPI
    });
  }
  
  return bgImage;
  
});

myApp.controller("myCtrl", function($scope,bgImage){
  
  bgImage.getImages().success(function(response){
    document.body.style.backgroundImage = "url("+response.url+")";
  });
  
});