sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (BaseController, Controller, UIComponent) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.Login", {
		onInit: function () {
			this.byId("usuario").addBeginIcon("sap-icon://person-placeholder");
			this.byId("contrasenia").addBeginIcon("sap-icon://key");
			this.getRouter().getRoute("Login").attachPatternMatched(this._onRouteMatched, this);
		},
		
		onPressLogin: function () {
			// debugger;
			// var sUsuario = this.byId("usuario").getValue();
			// var sContrasenia = this.byId("contrasenia").getValue();
			
			// if(sUsuario === "Entelgy" && sContrasenia === "123456"){
			 UIComponent.getRouterFor(this).navTo("Inicio");
			 this.getView().getParent().setBackgroundImage("");
			 
			 //obtener inicial para avatar
			 
			 //
			 //Esto debería borrarse al implementar manejo de usuarios
			 //
			 
			 var sUsuario = this.getModel("Login").getProperty("/usuario");
			 
			 if (!sUsuario) {
			 	this.getModel("Login").setProperty("/usuario","Entelgy");
			 	sUsuario = this.getModel("Login").getProperty("/usuario");
			 }
			 var sInicial = sUsuario.slice(0,1).toUpperCase();
			 this.getModel("Login").setProperty("/inicial",sInicial);
			// }
		},
		
		onOlvidarContraseniaPress: function() {
			UIComponent.getRouterFor(this).navTo("OlvidarCont");
		},
		
		_onRouteMatched: function() {
		this.getView().getParent().setBackgroundImage("./images/animacion_lineas.gif");
		}
	});
});