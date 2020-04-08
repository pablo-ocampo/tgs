sap.ui.define([
	"sap/ui/core/mvc/Controller",
	
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("neo.tgs.controller.Login", {
		onInit: function () {

		},
		
		onPressLogin: function () {
			UIComponent.getRouterFor(this).navTo("SplitApp");
		}
	});
});