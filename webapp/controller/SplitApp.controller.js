sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller"
], function (BaseController, Controller) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.SplitApp", {
		onInit: function () {
			
		},
		
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			if (oItem.getHasExpander()) {
				if (oItem.getExpanded()) {
					oItem.collapse();
				}
				else {
					oItem.expand();
				}
			}
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		}
	});
});