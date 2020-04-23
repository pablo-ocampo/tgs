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
		
		onCancel: function() {
			this.onNavBack();
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
		},
		
		onSave: function() {
			this.getModel().submitChanges();
		},
		
		handleChangeDatePicker: function(oControlEvent) {
			// var value = oControlEvent.getParameters().value;
			// value = value + "T00:00"
			// this.byId("inpFecha").setValue(value);
			// debugger;
			
		}
	});
});