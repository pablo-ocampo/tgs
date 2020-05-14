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
			
			if (this.getView().getModel().hasPendingChanges() || this.byId("inpCAI").getValue() !== "" || this.byId("inpTC").getValue() !== "0,00" || this.byId("inp27").getValue() !== "0,00"
			|| this.byId("inp21").getValue() !== "0,00" || this.byId("inp10").getValue() !== "0,00" || this.byId("inpIIBB").getValue() !== "0,00" || this.byId("inpIIBB2").getValue() !== "0,00" || this.byId("inpOtros").getValue() !== "0,00") {
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
							that.byId("inpCAI").setValueState("None");
							that.byId("inpTC").setValueState("None");
							that.byId("inp27").setValueState("None");
							that.byId("inp21").setValueState("None");
							that.byId("inp10").setValueState("None");
							that.byId("inpIIBB").setValueState("None");
							that.byId("inpIIBB2").setValueState("None");
							that.byId("inpOtros").setValueState("None");
							that.byId("multiComboBox").clearSelection();
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
		
		handleSelectionFinish: function(oEvent) {
			var aItems = oEvent.getParameter("selectedItems");
			var keys = [];
			for (var i = 0; i < aItems.length; i++) {
				keys.push(aItems[i].getKey());
			}
			
			var oInp27 = this.byId("inp27");
			var oInp21 = this.byId("inp21");
			var oInp10 = this.byId("inp10");
			var oInpIIBB = this.byId("inpIIBB");
			
			if(keys.includes("inp27")) {
				oInp27.setVisible(true);
				oInp27.setRequired(true);
			} else {
				oInp27.setVisible(false);
				oInp27.setRequired(false);
			}
			
			if(keys.includes("inp21")) {
				oInp21.setVisible(true);
				oInp21.setRequired(true);
			} else {
				oInp21.setVisible(false);
				oInp21.setRequired(false);
			}
			
			if(keys.includes("inp10")) {
				oInp10.setVisible(true);
				oInp10.setRequired(true);
			} else {
				oInp10.setVisible(false);
				oInp10.setRequired(false);
			}
			
			if(keys.includes("inpIIBB")) {
				oInpIIBB.setVisible(true);
				oInpIIBB.setRequired(true);
			} else {
				oInpIIBB.setVisible(false);
				oInpIIBB.setRequired(false);
			}
		},
		
		onCancel: function() {
			var that = this;
			if (this.getView().getModel().hasPendingChanges() || this.byId("inpCAI").getValue() !== "" || this.byId("inpTC").getValue() !== "0,00" || this.byId("inp27").getValue() !== "0,00"
			|| this.byId("inp21").getValue() !== "0,00" || this.byId("inp10").getValue() !== "0,00" || this.byId("inpIIBB").getValue() !== "0,00" || this.byId("inpIIBB2").getValue() !== "0,00" || this.byId("inpOtros").getValue() !== "0,00") {
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
							that.byId("inpTC").setValueState("None");
							that.byId("inpCAI").setValueState("None");
							that.byId("inp27").setValueState("None");
							that.byId("inp21").setValueState("None");
							that.byId("inp10").setValueState("None");
							that.byId("inpIIBB").setValueState("None");
							that.byId("inpIIBB2").setValueState("None");
							that.byId("inpOtros").setValueState("None");
							that.byId("multiComboBox").clearSelection();
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
		
		onUpload: function (oEvent) {
			var oFileUpload = this.getView().byId("fileUploader");
			var domRef = oFileUpload.getFocusDomRef();
			var file = domRef.files[0];
			var that = this;
			this.fileType = file.type;
			var reader = new FileReader();
			reader.onload = function (e) {
				var vContent = e.currentTarget.result.replace("data:" + file.type + ";base64,", "");
				that.bindArchivo(vContent);
				};
			reader.readAsDataURL(file);
		},
		
		handleTypeMissmatch: function() {
			MessageBox.error("Sólo se admite el tipo de archivo PDF. Seleccione el PDF correspondiente a la factura");
		},
		
		bindArchivo: function(contenido) {
			var oModel = this.getView().getModel();
			var oBinding = this.byId("inpFactura").getBindingContext();
			oModel.setProperty(oBinding + "/Archivo", contenido);
		},
		
		onChangeRetenciones: function(oEvent) {
			if (!oEvent.getSource().getValue()) {
				oEvent.getSource().setValue("0,00");
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
			var errorCAI			= this._validateInput(this.byId("inpCAI"));
			var errorTipoCambio		= this._validateInput(this.byId("inpTC"));
			var errorIVA27;
			var errorIVA21;
			var errorIVA10;
			var errorIIBB;
			
			if(this.byId("inp27").getVisible()) {
				errorIVA27 = this._validateInput(this.byId("inp27"));
			} else {
				errorIVA27 = false;
			}
			
			if(this.byId("inp21").getVisible()) {
				errorIVA21 = this._validateInput(this.byId("inp21"));
			} else {
				errorIVA21 = false;
			}
			
			if(this.byId("inp10").getVisible()) {
				errorIVA10 = this._validateInput(this.byId("inp10"));
			} else {
				errorIVA10 = false;
			}
			
			if(this.byId("inpIIBB").getVisible()) {
				errorIIBB = this._validateInput(this.byId("inpIIBB"));
			} else {
				errorIIBB = false;
			}
			
	
			if(!errorIVA27 && !errorIVA21 && !errorIVA10 && !errorIIBB && !errorCuit && !errorCAI && !errorTipoCambio && !errorFecha && !errorFactura && !errorOrdenCompra && !errorMoneda && !errorImporte && !errorClaseDoc) {
				this.getView().setBusy(true);
				this.byId("multiComboBox").clearSelection();
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
				Docid: "",
				Archivo: ""
			};

			// create new entry in the model
			this._oContext = this.getModel().createEntry("/DatosDemoSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this),
				error: this._onError
			});	
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
			
			this.getView().getModel().resetChanges();
			//reset a los campos que no hacen bind a sap
			this.getModel("Login").setProperty("/tipoCambio","");
			this.getModel("Login").setProperty("/CAI","");
			this.getModel("Login").setProperty("/IVA27","");
			this.getModel("Login").setProperty("/IVA21","");
			this.getModel("Login").setProperty("/IVA10","");
			this.getModel("Login").setProperty("/IIBB","");
			this.getModel("Login").setProperty("/OTROS","");
			this.getModel("Login").setProperty("/IIBB2","");
			this.byId("inp27").setVisible(false);
			this.byId("inp21").setVisible(false);
			this.byId("inp10").setVisible(false);
			this.byId("inpIIBB").setVisible(false);
			this.byId("multiComboBox").clearSelection();
			
		},
		
		_deleteChanges: function () {
			this.getView().getModel().resetChanges();
			//reset a los campos que no hacen bind a sap
			this.getModel("Login").setProperty("/tipoCambio","");
			this.getModel("Login").setProperty("/CAI","");
			this.getModel("Login").setProperty("/IVA27","");
			this.getModel("Login").setProperty("/IVA21","");
			this.getModel("Login").setProperty("/IVA10","");
			this.getModel("Login").setProperty("/IIBB","");
			this.getModel("Login").setProperty("/OTROS","");
			this.getModel("Login").setProperty("/IIBB2","");
			this.byId("inp27").setVisible(false);
			this.byId("inp21").setVisible(false);
			this.byId("inp10").setVisible(false);
			this.byId("inpIIBB").setVisible(false);
			this.byId("multiComboBox").clearSelection();
		},
		
		_onError: function(oError) {
			MessageBox.error("Error al Actualizar");
			this.getView().getModel().resetChanges();
			
			//reset a los campos que no hacen bind a sap
			this.getModel("Login").setProperty("/tipoCambio","");
			this.getModel("Login").setProperty("/CAI","");
			this.getModel("Login").setProperty("/IVA27","");
			this.getModel("Login").setProperty("/IVA21","");
			this.getModel("Login").setProperty("/IVA10","");
			this.getModel("Login").setProperty("/IIBB","");
			this.getModel("Login").setProperty("/OTROS","");
			this.getModel("Login").setProperty("/IIBB2","");
			this.byId("inp27").setVisible(false);
			this.byId("inp21").setVisible(false);
			this.byId("inp10").setVisible(false);
			this.byId("inpIIBB").setVisible(false);
			this.byId("multiComboBox").clearSelection();
		},
		
		_onCreateSuccess: function (oFactura) {
		
			this.getView().setBusy(false);
			// show success messge
			// var sMessage = this.getResourceBundle().getText("newObjectCreated", [oFactura.NumFac]);
			// MessageToast.show(sMessage, {
			// 	closeOnBrowserNavigation : false
			// });
			
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