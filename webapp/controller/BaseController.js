sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/library"
], function (Controller, UIComponent, mobileLibrary) {
	"use strict";


	return Controller.extend("neo.tgs.controller.BaseController", {
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		
		onNavBack : function() {
		
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("View1", {}, true);
			}
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		
		onPress: function (oEvent) {
			var oText = oEvent.getSource().getProperty("text");
			var oSplitAppView = oEvent.getSource();
			
			while (oSplitAppView.getParent()) {
				try  {
					oSplitAppView.getViewName();
				}
				catch (error) {
					oSplitAppView = oSplitAppView.getParent();
					continue;
				}
				
				if (oSplitAppView.getViewName() !== "neo.tgs.view.SplitApp") {
					oSplitAppView = oSplitAppView.getParent();
				} else {
					oSplitAppView.byId("pageContainer").to(oSplitAppView.createId(oText));
					break;
				}
			}	
		}
	});

});