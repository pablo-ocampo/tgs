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
			var sKey = oItem.getKey();
			if (oItem.getHasExpander()) {
				if (oItem.getExpanded()) {
					oItem.collapse();
				}
				else {
					oItem.expand();
				}
			}
			// this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
			this.getRouter().navTo(sKey);
		},
		
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId("sideNavigationToggleButton");
			if (bLarge) {
				oToggleButton.setTooltip("Large Size Navigation");
			} else {
				oToggleButton.setTooltip("Small Size Navigation");
			}
		}
	});
});