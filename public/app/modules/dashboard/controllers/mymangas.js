

dashboard.controller("mymangasController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray) {
  var vm = this;


  var ref = firebase.database().ref('mangas/');
  var mangaList = $firebaseArray(ref);
  mangaList.$loaded().then(function(){
    console.log(mangaList)
    $scope.mangas = mangaList;
  });

  $scope.modal = function(manga) {

      var ref = firebase.database().ref('images/'+manga.imageFile);
      var imageObj = $firebaseObject(ref);
      imageObj.$loaded().then(function(){
          console.log("image");
          console.log(imageObj)
          $scope.imageManga = imageObj.$value;
          $scope.modalmanga = manga;
          console.log($scope.modalmanga);
      });
  }

  $scope.remove = function(manga) {
    console.log("deleting...");
    var mangaID = manga.$id;
    console.log(mangaID);
    var ref = firebase.database().ref('mangas/'+manga.$id);
    var mangaObject = $firebaseObject(ref);

    mangaObject.$loaded().then(function(){
      mangaObject.$remove().then(function(){
        swal({
          title: "Mangá removido!",
          timer: 1700,
          showConfirmButton: false });
      }, function(error) {
        console.log("Error:", error);
      });
    });
  }
}]);