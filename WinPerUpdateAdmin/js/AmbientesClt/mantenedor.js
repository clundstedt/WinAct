﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('mantenedor', mantenedor);

    mantenedor.$inject = ['$scope', '$window', '$routeParams', 'serviceAmbientes', '$timeout'];

    function mantenedor($scope, $window, $routeParams, serviceAmbientes,$timeout) {
        $scope.title = 'Mantenedor Ambiente';

        activate();

        function activate() {
            $scope.msgError = "";
            $scope.msgSuccess = "";

            $scope.idAmbiente = (angular.isUndefined($routeParams.idAmbiente) ? 0 : $routeParams.idAmbiente);
            $scope.idCliente = $routeParams.idCliente;
            $scope.labelcreate = ($scope.idAmbiente == 0) ? "Crear" : "Modificar";
            $scope.title = ($scope.idAmbiente == 0) ? "Crear Ambiente" : "Modificar Ambiente";
            $scope.increate = true;
            $scope.tipos = [{ "Codigo": 1, "Descripcion": "Producción" }, { "Codigo": 2, "Descripcion": "Pruebas" }, {"Codigo":3 , "Descripcion":"HH.RR"}]



            if ($scope.idAmbiente > 0) {
                serviceAmbientes.getAmbiente($scope.idCliente, $scope.idAmbiente).success(function (data) {
                    console.log(JSON.stringify(data));
                    $scope.ambiente = data;
                    $scope.msgError = "";
                }).error(function (err) {
                    console.error(err); $scope.msgError = "Ocurrió un error durante la petición, contacte al administrador del sitio.";window.scrollTo(0,0);
                });
            }

            $scope.SaveAmbiente = function (formData) {
                $scope.msgSuccess = "";
                console.log(JSON.stringify(formData));
                $scope.increate = false;
                $scope.labelcreate = "Enviando";
                //Se Crea
                if ($scope.idAmbiente == 0) {
                    serviceAmbientes.addAmbiente($scope.idCliente, formData.Nombre, formData.Tipo, formData.ServerBd, formData.Instancia, formData.NomBd, formData.UserDbo, formData.PwdDbo).success(function (data) {
                        $scope.increate = true;
                        $scope.labelcreate = "Modificar";
                        $scope.msgError = "";
                        $scope.msgSuccess = "Ambiente creado exitosamente!.";
                        $scope.idAmbiente = data.idAmbientes;
                        window.scrollTo(0, 0);
                        $timeout(function () {
                            $window.location.href = "/AmbientesClt#/";
                        }, 2000);
                    }).error(function (err) {
                        console.error(err); $scope.msgError = "Ocurrió un error durante la petición, contacte al administrador del sitio.";window.scrollTo(0,0);
                    });
                } else {//Se Modifica
                    serviceAmbientes.updAmbiente($scope.idCliente, $scope.idAmbiente, formData.Nombre, formData.Tipo, formData.ServerBd, formData.Instancia, formData.NomBd, formData.UserDbo, formData.PwdDbo).success(function (data) {
                        $scope.increate = true;
                        $scope.labelcreate = "Modificar";
                        $scope.msgSuccess = "Ambiente modificado exitosamente!.";
                        $scope.msgError = "";
                        window.scrollTo(0, 0);
                        $timeout(function () {
                            $window.location.href = "/AmbientesClt#/";
                        }, 2000);
                    }).error(function (err) {
                        console.error(err); $scope.msgError = "Ocurrió un error durante la petición, contacte al administrador del sitio.";window.scrollTo(0,0);
                    });
                }
            }

            $scope.Eliminar = function () {
                $scope.msgSuccess = "";
                serviceAmbientes.delAmbiente($scope.idCliente, $scope.idAmbiente).success(function () {
                    $scope.msgSuccess = "Ambiente eliminado exitosamente!.";
                    window.scrollTo(0, 0);
                    $window.setTimeout(function () {
                        $window.location.href = "/AmbientesClt#/";0
                    }, 2000);
                    $scope.msgError = "";
                }).error(function (err) {
                    console.error(err); $scope.msgError = "Ocurrió un error durante la petición, contacte al administrador del sitio.";window.scrollTo(0,0);
                });
            }

        }
    }
})();
