// New

var App = angular.module("formApp", ["firebase"]);

App.factory("userList", ["$firebaseArray",
  function($firebaseArray) {

    var ref = new Firebase("https://form-creator.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

App.controller("formCtrl", ["$scope", "userList",
function($scope, userList) {
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.id = '';

	$scope.users = userList;

	$scope.hideForm = true;

	$scope.error = false;

	$scope.createUser = function() {

	   var newFirstName = $('#new-firstname').val();
	   var newLastName =  $('#new-lastname').val();
	   var newEmail =  $('#new-email').val();
	   var newID = $('#new-id').val();

	   if(newFirstName == '') {
	      $('#message-one').text('First Name required');
	      setTimeout(function(){
	         $('#message-one').text('');
	      },3000);
	      return;
	   }

	   if(newLastName == '') {
	      $('#message-one').text('Last Name required');
	      setTimeout(function(){
	         $('#message-one').text('');
	      },3000);
	      return;
	   }

	   if(newEmail == '') {
	      $('#message-one').text('E-mail required');
	      setTimeout(function(){
	         $('#message-one').text('');
	      },3000);
	      return;
	   }

	   if(newID == '') {
	      $('#message-one').text('I.D required');
	      setTimeout(function(){
	         $('#message-one').text('');
	      },3000);
	      return;
	   }
	   for(var key in $scope.users) {
	      if(newEmail === $scope.users[key].email) {
	         $('#message-one').text('Email Already In Use. Choose Another.');
	         setTimeout(function(){
	            $('#message-one').text('');
	         },3000);
	         return;
	      }
	   }
	   for(var key in $scope.users) {
	      if(newID === $scope.users[key].id) {
	         $('#message-one').text('I.D is Associated to an existing user. Choose Another.');
	         setTimeout(function(){
	            $('#message-one').text('');
	         },3000);
	         return;
	      }
	   }

	   $scope.users.$add({

	      firstName: newFirstName,
	      lastName: newLastName,
	      email: newEmail,
	      id: newID,

	   });

	   $('#message-one').text('New User Created!');
	   setTimeout(function(){
	      $('#message-one').text('');
	   },3000);
	   console.log("Create Function Working");

	}

	$scope.editUser = function(user) {
	   console.log(user);
	   $scope.hideForm = false;

	   $('#edit-firstname').text('');
	   $('#edit-lastname').text('');
	   $('#edit-email').text('');

	   var editFirstName = user.firstName;
	   var editLastName = user.lastName;
	   var editEmail = user.email;

	   $scope.saveChanges = function() {

	      console.log("Save Function Working");

	      user.firstName = $('#edit-firstname').val();
	      user.lastName = $('#edit-lastname').val();
	      user.email = $('#edit-email').val();

	      if(user.firstName == '') {
	         $('#message-two').text('First Name required');
	         setTimeout(function(){
	            $('#message-one').text('');
	         },3000);
	         user.firstName = editFirstName;
	     	 user.lastName = editLastName;
	      	 user.email = editEmail;
	         return;
	      }
	      if(user.lastName == '') {
	         $('#message-two').text('Last Name required');
	         setTimeout(function(){
	            $('#message-one').text('');
	         },3000);
	         user.firstName = editFirstName;
	     	 user.lastName = editLastName;
	      	 user.email = editEmail;
	         return;
	      }
	      if(user.email == '') {
	         $('#message-two').text('E-mail required');
	         setTimeout(function(){
	            $('#message-one').text('');
	         },3000);
	         user.firstName = editFirstName;
	     	 user.lastName = editLastName;
	      	 user.email = editEmail;
	         return;
	      }

	      $('#message-one').text('Saved Changes!');
	      setTimeout(function(){
	         $('#message-one').text('');
	      },3000);
	      document.getElementById("edit-firstname").value = '';
	      document.getElementById("edit-lastname").value = '';
	      document.getElementById("edit-email").value = '';
	      $scope.hideForm = true;
	      alert("Saved Changes!");

	      //return user;
	      $scope.users.$save(user);

	   }

	   console.log("Edit Function Working");

	}

	$scope.deleteUser = function(user) {

	   console.log(user);
	   var index = $scope.users.indexOf(user);
	   //$scope.users.splice(index, 1);
	   $scope.users.$remove(index);
	   $('#message-one').text('User Deleted!');
	   setTimeout(function(){
	      $('#message-one').text('');
	   },3000);
	   console.log("Delete Function Working");

	}

	$scope.undo = function() {

	   document.getElementById("edit-firstname").value = '';
	   document.getElementById("edit-lastname").value = '';
	   document.getElementById("edit-email").value = '';
	   $scope.hideForm = true;
	   console.log("Undo Function Working");

	}

 }

]);
