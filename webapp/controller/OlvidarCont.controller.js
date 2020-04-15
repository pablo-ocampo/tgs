sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (BaseController, Controller, UIComponent) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.OlvidarCont", {
		onInit: function () {
			
			this.byId("usuario").addBeginIcon("sap-icon://person-placeholder");
			this.byId("email").addBeginIcon("sap-icon://email");

		}
	});
});