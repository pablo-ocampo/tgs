sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox"
], function (BaseController,MessageBox) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.ImagenFactura", {
		onInit: function () {

		},
		
		onPressBuscarPDF: function () {
			var errorDP = this._validateInput(this.byId("inpDP"));
			if (errorDP) {
				return;
			}
			var oPDF = this.byId("PDFViewer");
			var oView = this.getView();
			var sValueDP = this.byId("inpDP").getValue();
			var oModel = this.getModel();
			var that = this;
			var oPage = this.byId("PageImagenFactura");
			
			
			oView.setBusy(true);
			oModel.read("/DevolverPDFSet('" + sValueDP + "')",{
				success: function(oData,response) {
					oView.setBusy(false);
					
					if(oData.Value) {
						that.byId("VBoxBuscar").addStyleClass("sapUiLargeMarginBottom");
						oPDF.setVisible(true);
						jQuery.sap.delayedCall(500, oPage, "scrollToElement", [oPDF,700]);
						var xString = oData.Value;
						var decodedPdfContent = atob(xString);
						var byteArray = new Uint8Array(decodedPdfContent.length);
						for(var i=0; i<decodedPdfContent.length; i++){
						    byteArray[i] = decodedPdfContent.charCodeAt(i);
						}
						var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
						var _pdfurl = URL.createObjectURL(blob);
						oPDF.setSource(_pdfurl);
						jQuery.sap.addUrlWhitelist("blob");
					}
					else {
						MessageBox.error("No se ha encontrado el archivo PDF solicitado.");
						oPDF.setVisible(false);
					}
					
				},
				error: function() {
					oView.setBusy(false);
					MessageBox.error("No se ha encontrado el archivo PDF solicitado.");
				}
			});
		}
	});
});