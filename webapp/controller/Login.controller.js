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

		},
		
		onPressLogin: function () {
			// debugger;
			var sUsuario = this.byId("usuario").getValue();
			var sContrasenia = this.byId("contrasenia").getValue();
			
			if(sUsuario === "Entelgy" && sContrasenia === "123456"){
				UIComponent.getRouterFor(this).navTo("SplitApp");
			}
		},
		
		onOlvidarContraseniaPress: function() {
			UIComponent.getRouterFor(this).navTo("OlvidarCont");
		}
	});
});