
dashboard.controller("searchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','notification','$firebaseObject',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray, notification, $firebaseObject) {
    var vm = this;

    $scope.search = function(query) {
        console.log(query);
        $scope.searchItem = query;
        var ref = firebase.database().ref('mangas/');
        var mangaList = $firebaseArray(ref);
        mangaList.$loaded().then(function(){
            console.log(mangaList)
            $scope.mangas = mangaList;

        });
    }
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
    $scope.modalUserDetail = function(manga) {

        var ref = firebase.database().ref('users/'+manga.userUid);
        var userDetail = $firebaseObject(ref);
        userDetail.$loaded().then(function(){
            $scope.modaluser = userDetail;

        });
    }



    $scope.trade = function(manga, id) {
        var createTrade = ({'state': 'received', 'sender': $rootScope.userDB.uid, 'receiver': manga.userUid, 'mangaSenderIsInterested': {'id': manga.$id, 'manga': manga}, 'mangaReceiverIsInterested' : null})
        var ref = firebase.database().ref('trades/');
        notification.send("Você recebeu proposta de troca. Verificar no menu 'Trocas'", manga.userUid);
        var tradesList = $firebaseArray(ref);
        tradesList.$loaded().then(function(){
            // add an item
            tradesList.$add(createTrade).then(function(ref) {
                swal({
                    title: "Interesse enviado ao usuário!",
                    timer: 1700,
                    showConfirmButton: false });

                });

            });


        }


    }]);
