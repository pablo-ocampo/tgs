sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/m/MessageBox"
], function (BaseController, Controller, MessageToast, formatter, MessageBox) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.IngresarFactura", {
		formatter: formatter,
		onInit: function () {
			
			// Register to the add route matched
			this.getRouter().getRoute("IngresarFactura").attachPatternMatched(this._onRouteMatched, this);
		},
		
		onCancel: function() {
			this.onNavBack();
		},
		
		onSave: function() {
			var errorCuit = this._validateInput(this.byId("inpCuit"));
			var errorFecha = this._validateDate(this.byId("inpFecha"));
			var errorFactura = this._validateInput(this.byId("inpFactura"));
			var errorOrdenCompra = this._validateInput(this.byId("inpOrdenCompra"));
			var errorMoneda = this._validateInput(this.byId("inpMoneda"));
			var errorImporte = this._validateInput(this.byId("inpImporte"));
			var errorClaseDoc = this._validateSelect(this.byId("inpClaseDoc"));
			if(!errorCuit && !errorFecha && !errorFactura && !errorOrdenCompra && !errorMoneda && !errorImporte && !errorClaseDoc) {
				this.getView().getModel().submitChanges();
			}
		},
		
		setSave : function(boolean) {
			
			this.byId("ingresarBtn").setEnabled(boolean);	
		},
		
		onChange: function(oEvent) {
			this._validateInput(oEvent.getSource());
		},
		
		onChangeDate: function(oEvent) {
			this._validateDate(oEvent.getSource());
		},
		
		onChangeSelect: function(oEvent) {
			this._validateSelect(oEvent.getSource());
		},
		
		onParseError: function(oEvent) {
			
				var	sValueState = "Error";
				// this.setSave(false);
				oEvent.getSource().setValueState(sValueState);
		},
		
		_onRouteMatched: function() {

		// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded: function () {
			// create default properties
			var oProperties = {	CuitProv: "",
				FechaFac: "",
				OrdenCom: "",
				NumFac: "",
				Importe: "",
				Moneda: "",
				ClaseDoc: "",
				Docid: ""
			};

			// create new entry in the model
			this._oContext = this.getModel().createEntry("/Datos_demoSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});	
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		
		_onError: function(oError) {
			MessageBox.error("Error al Actualizar");
			this.getView().getModel().resetChanges();
		},
		
		_onCreateSuccess: function (oFactura) {
		
			// show success messge
			var sMessage = this.getResourceBundle().getText("newObjectCreated", [oFactura.NumFac]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});
			
			MessageBox.success("La factura ha sido correctamente creada. ID de documento: " + oFactura.Docid + "." , {
				title: "¡Éxito!",
				id: "messageBoxId1",
				contentWidth: "100px"
			});
			this._onRouteMatched();
		},
		
		_validateInput: function(oInput) {
			
			var oBinding = oInput.getBinding("value");
			var sValueState = "None";
			var bValidationError = false;
			var b = isNaN(oInput.getValue());
			
			
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
			debugger;
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
			debugger;
			var sValueState = "None";
			var bValidationError = false;
			var a = oSelect.getSelectedKey();
			
			if (!oSelect.getSelectedKey()) {
				sValueState = "Error";
				bValidationError = true;
			}
			
			oSelect.setValueState(sValueState);

			return bValidationError;
		}
	});
});