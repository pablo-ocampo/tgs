sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (BaseController, Controller, UIComponent) {
	"use strict";

	return Controller.extend("neo.tgs.controller.Login", {
		onInit: function () {
			
			this.byId("usuario").addBeginIcon("sap-icon://person-placeholder");
			this.byId("contrasenia").addBeginIcon("sap-icon://key");

		},
		
		onPressLogin: function () {
			UIComponent.getRouterFor(this).navTo("SplitApp");
		}
	});
});