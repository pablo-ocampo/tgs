sap.ui.define([
	"sap/ui/core/mvc/Controller",
	
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
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