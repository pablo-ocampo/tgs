sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/m/library"
], function (Controller, UIComponent, History, mobileLibrary) {
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
		
		onExit: function() {
			return true;
		},
		
		onNavBack : function() {
		
			var sPreviousHash = History.getInstance().getPreviousHash();
			console.log(sPreviousHash);
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("Login", {}, true);
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
			if(this.onExit(oText,this)) {
				this.getRouter().navTo(oText);
			}
		},
		
		onChange: function(oEvent) {
			this._validateInput(oEvent.getSource());
		},
		
		onChangeOptional: function(oEvent) {
			if(oEvent.getSource().getValue()) {
				this._validateInput(oEvent.getSource());
			}
			else {
				oEvent.getSource().setValueState("None");
			}
		},
		
		onChangeDate: function(oEvent) {
			this._validateDate(oEvent.getSource());
		},
		
		onChangeDateOptional: function(oEvent) {
			if(oEvent.getSource().getValue()) {
				this._validateDate(oEvent.getSource());
			}
			else {
				oEvent.getSource().setValueState("None");
			}
		},
		
		onChangeSelect: function(oEvent) {
			this._validateSelect(oEvent.getSource());
		},
		
		_validateInput: function(oInput) {
			
			var oBinding = oInput.getBinding("value");
			var sValueState = "None";
			var bValidationError = false;
			
			
			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}
			
			if (oInput.getValue().includes('_')) {
				sValueState = "Error";
				bValidationError = true;
			}
			
			if (oInput.getValue() === "0" || oInput.getValue() === "0,00" || !oInput.getValue()) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);
			return bValidationError;
		},
		
		_validateDate: function(oInput) {
			var oBinding = oInput.getBinding("value");
			var sValueState = "None";
			var bValidationError = false;
			
			
			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}
			
			if (!isNaN(oInput.getValue()) || !oInput.getValue()) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);
			return bValidationError;
		},
		
		_validateSelect: function(oSelect) {
			var sValueState = "None";
			var bValidationError = false;
			
			if (!oSelect.getSelectedKey()) {
				sValueState = "Error";
				bValidationError = true;
			}
			
			oSelect.setValueState(sValueState);

			return bValidationError;
		}
	});

});