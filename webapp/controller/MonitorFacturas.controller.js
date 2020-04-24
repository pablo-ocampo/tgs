sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.MonitorFacturas", {
		formatter: formatter,
		
		onInit: function () {
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});
				
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				}
			);
		},
		
		setVisibleOnSearch: function(boolean) {
			var oTable = this.byId("mainTable");
			var oCards = this.byId("Cards");
			var oPage = this.byId("PageMonFac");
			debugger;
			oTable.setVisible(boolean);
			oCards.setVisible(boolean);
		},
		
		onPressBuscarFactura: function() {
			// this.createId("Cards");
			// var oCards = $( "#Cards" );
			// oCards.scrollIntoView();
			this.setVisibleOnSearch(true);
			var oCards = this.byId("Cards");
			var oPage = this.byId("PageMonFac");
			jQuery.sap.intervalCall(500, oPage , "scrollToElement", [oCards,700]);
			var sValueSoc = this.byId("inpSociedad").getSelectedKey();
			var sValueFactura = this.byId("inpFactura").getValue();
			var sValueFecha1 = this.byId("inpDesde").getDateValue();
			var sValueFecha2 = this.byId("inpHasta").getDateValue();
			var sValueCuit = this.byId("inpCuit").getValue();
			var sValueEstado = this.byId("inpEstado").getSelectedKey();
			
			var oFilterSociedad = new Filter(
				"Bukrs",
				sap.ui.model.FilterOperator.EQ, sValueSoc
			);
			var oFilterFactura = new Filter(
				"Xblnr",
				sap.ui.model.FilterOperator.EQ, sValueFactura
			);
			var oFilterFecha = new Filter(
				"Bldat",
				sap.ui.model.FilterOperator.BT, sValueFecha1, sValueFecha2
			);
			var oFilterCuit = new Filter(
				"Stcd1",
				sap.ui.model.FilterOperator.EQ, sValueCuit
			);
			var oFilterEstado = new Filter(
				"Estado",
				sap.ui.model.FilterOperator.EQ, sValueEstado
			);
			this._onListMatched(oFilterSociedad,oFilterFactura,oFilterFecha,oFilterCuit,oFilterEstado);
			debugger;
			
		},
		
		onSearch : function (evt) {
			// debugger;
			var sValue = evt.getParameter("query");
			if (!sValue) {
				sValue = evt.getParameter("newValue");
			}
			var oFilter = new Filter(
				"Name1",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			this.byId("mainTable").getBinding("items").filter([oFilter]);
		// 	var oTable = this.getView().byId("mainTable");
		// 	oTable.bindRows({
		// 	   path: "/datosCabeceraSet",
		// 	   template: this.byId("item"),
		// 				templateShareable: true,
		// 			   parameters: {
		// 			      operationMode: "Client"
		// 			   }
		// });
		},
		
		_onListMatched : function (oFilterSociedad,oFilterFactura,oFilterFecha,oFilterCuit,oFilterEstado) {
		
			// var sLocalId =  oEvent.getParameter("arguments").localId;
			// var mode = oEvent.getParameter("arguments").mode;
			// var oFilter = new Filter(
			// 	"Localidad",
			// 	sap.ui.model.FilterOperator.EQ, sLocalId
			// );
			// var oFilter2 = new Filter(
			// 	"Modo",
			// 	sap.ui.model.FilterOperator.EQ, mode
			// );
			
			var oTable = this.getView().byId("mainTable");
			oTable.bindItems({	path: "/datosCabeceraSet",
								template: this.byId("item"),
								templateShareable: true,
								filters: [oFilterSociedad,oFilterFactura,oFilterFecha,oFilterCuit,oFilterEstado]
			});
		}
		
	});
});