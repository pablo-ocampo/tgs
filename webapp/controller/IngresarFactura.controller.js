sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/m/MessageBox",
	"sap/m/library",
	"sap/m/Text",
	"sap/m/Dialog",
	"sap/m/Button"
], function (BaseController, Controller, MessageToast, formatter, MessageBox, mobileLibrary, Text, Dialog, Button) {
	"use strict";
	
	var ButtonType = mobileLibrary.ButtonType;

	return BaseController.extend("neo.tgs.controller.IngresarFactura", {
		formatter: formatter,
		onInit: function () {
			
			// Register to the add route matched
			this.getRouter().getRoute("IngresarFactura").attachPatternMatched(this._onRouteMatched, this);
		},
		
		onExit: function (sKey, oSpliAppView) {
			
			var that = this;
			var result = true;
			
			if (this.getView().getModel().hasPendingChanges()) {
				result = false;
				var oDialog = new Dialog({
					title: "Alerta",
					type: "Message",
					content: new Text({ text: "Si sale perderá los cambios" }),
					beginButton: new Button({
						text: "Perder cambios",
						press: function () {
							oDialog.close();
							that.getView().getModel().resetChanges();
							that.byId("inpCuit").setValueState("None");
							that.byId("inpFecha").setValueState("None");
							that.byId("inpFactura").setValueState("None");
							that.byId("inpOrdenCompra").setValueState("None");
							that.byId("inpMoneda").setValueState("None");
							that.byId("inpImporte").setValueState("None");
							that.byId("inpClaseDoc").setValueState("None");
							oSpliAppView.getRouter().navTo(sKey);
						}
					}),
					endButton: new Button({
						type: ButtonType.Emphasized, 
						text: "Cancelar",
						press: function () {
							oDialog.close();
							result = false;
						}
					}),
					afterClose: function () {
						oDialog.destroy();
					}
				});

			oDialog.open();
			}
			
			return result;
		},
		
		onCancel: function() {
			var that = this;
			if (this.getView().getModel().hasPendingChanges()) {
				var oDialog = new Dialog({
					title: "Alerta",
					type: "Message",
					content: new Text({ text: "¿Borrar todos los cambios?" }),
					beginButton: new Button({
						text: "Borrar cambios",
						press: function () {
							oDialog.close();
							that._deleteChanges();
							that.getView().getModel().resetChanges();
							that.byId("inpCuit").setValueState("None");
							that.byId("inpFecha").setValueState("None");
							that.byId("inpFactura").setValueState("None");
							that.byId("inpOrdenCompra").setValueState("None");
							that.byId("inpMoneda").setValueState("None");
							that.byId("inpImporte").setValueState("None");
							that.byId("inpClaseDoc").setValueState("None");
						}
					}),
					endButton: new Button({
						type: ButtonType.Emphasized, 
						text: "Cancelar",
						press: function () {
							oDialog.close();
						}
					}),
					afterClose: function () {
						oDialog.destroy();
					}
				});

			oDialog.open();
			}
			
		},
		
		onSave: function() {
			var errorCuit			= this._validateInput(this.byId("inpCuit"));
			var errorFecha			= this._validateDate(this.byId("inpFecha"));
			var errorFactura		= this._validateInput(this.byId("inpFactura"));
			var errorOrdenCompra	= this._validateInput(this.byId("inpOrdenCompra"));
			var errorMoneda 		= this._validateInput(this.byId("inpMoneda"));
			var errorImporte		= this._validateInput(this.byId("inpImporte"));
			var errorClaseDoc		= this._validateSelect(this.byId("inpClaseDoc"));
			if(!errorCuit && !errorFecha && !errorFactura && !errorOrdenCompra && !errorMoneda && !errorImporte && !errorClaseDoc) {
				this.getView().getModel().submitChanges();
			}
		},
		
		setSave : function(boolean) {
			
			this.byId("ingresarBtn").setEnabled(boolean);	
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
			
			this.getView().getModel().resetChanges();
		},
		
		_deleteChanges: function () {
			this.getView().getModel().resetChanges();
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