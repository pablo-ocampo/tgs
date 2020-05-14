sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller"
], function (BaseController, Controller) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.SplitApp", {
		onInit: function () {
			this.byId("userMenu").addStyleClass("botonMenu");
			this.byId("boxMenu").addStyleClass("boxMenu");
		},
		
		onUserMenuPress: function(oEvent) {
			var oMenu = this.byId("userMenu");
			oMenu.fireDefaultAction();
		},
		
		onLogoPress: function(oEvent) {
			if(this.byId("NavContainer").getCurrentPage().getController().onExit("Inicio", this)) {
				this.getRouter().navTo("Inicio");
			}
		},
		
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sKey = oItem.getKey();
			if (oItem.getItems().length) {
				if (oItem.getExpanded()) {
					oItem.collapse();
				}
				else {
					oItem.expand();
				}
			}
			// this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
			
			if(!oItem.getItems().length && this.byId("NavContainer").getCurrentPage().getController().onExit(sKey, this)) {
				this.getRouter().navTo(sKey);
			}
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