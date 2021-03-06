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
		
		_mFilters: {
			Cargada: [new sap.ui.model.Filter("Estado", "EQ", "Cargada")],
			Procesada: [new sap.ui.model.Filter("Estado", "EQ", "Procesada")],
			Pagada: [new sap.ui.model.Filter("Estado", "EQ", "Pagada")],
			Rechazada: [new sap.ui.model.Filter("Estado", "EQ", "Rechazada")]
		},
		
		onInit: function () {
			var iOriginalBusyDelay,
				oViewModel;
			// Modelo usado para controlar numeros en cards y total en tabla, y delays
			oViewModel = new JSONModel({
				tableTitle : this.getResourceBundle().getText("monitorFacturasTituloTabla"),
				filterMessage: 0,
				tableBusyDelay : 0,
				total: 0,
				Cargada: 0,
				Procesada: 0,
				Pagada: 0,
				Rechazada: 0,
				busyTileProcesada : true,
				busyTilePagada: true,
				busyTileCargada: true,
				busyTileRechazada: true,
				delay : 0
			});
			this.setModel(oViewModel, "monFacView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				}
			);
		},
		
		onUpdateFinished : function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oModel = this.getModel(),
				oViewModel = this.getModel("monFacView"),
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			
			
			//creo los filtros de todos los inputs menos el de estado
			var sValueSoc = this.byId("inpSociedad").getSelectedKey();
			var sValueFactura = this.byId("inpFactura").getValue();
			var sValueFecha1 = this.byId("inpDesde").getDateValue();
			var sValueFecha2 = this.byId("inpHasta").getDateValue();
			var sValueCuit = this.byId("inpCuit").getValue();
			
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
			
			//solo actualizo los contadores si la tabla no esta vacia y el length es final
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("monitorFacturasTituloTablaCount", [iTotalItems]);
				
				//creo un filtro por cada estado y leo los $count
				jQuery.each(this._mFilters, function (sFilterKey, oFilterEstado) {
					oModel.read("/datosCabeceraSet/$count", {
						filters: [oFilterSociedad,oFilterFactura,oFilterFecha,oFilterCuit,oFilterEstado[0]],
						success: function (oData) {
							var sPath = "/" + sFilterKey;
							oViewModel.setProperty(sPath, oData);
							
							sPath = "/busyTile" + sFilterKey;
							oViewModel.setProperty(sPath, false);
						}
					});
				});
			} else {
				sTitle = this.getResourceBundle().getText("monitorFacturasTituloTabla");
			}
			this.getModel("monFacView").setProperty("/tableTitle", sTitle);
		},
		
		setVisibleOnSearch: function(boolean) {
			var oTable = this.byId("mainTable");
			var oCards = this.byId("Cards");
			oTable.setVisible(boolean);
			oCards.setVisible(boolean);
		},
		
		onPressBuscarFactura: function() {
			
			this.byId("filterMessageStrip").setVisible(false);
			this.getModel("monFacView").setProperty("/busyTileProcesada", true);
			this.getModel("monFacView").setProperty("/busyTilePagada", true);
			this.getModel("monFacView").setProperty("/busyTileRechazada", true);
			this.getModel("monFacView").setProperty("/busyTileCargada", true);
			
			var errorFechaDesde, errorFechaHasta, errorFactura,errorCuit;
			if(this.byId("inpDesde").getValue()){
				errorFechaDesde = this._validateDate(this.byId("inpDesde"));
			}else{
				errorFechaDesde = false;
			}
			
			if(this.byId("inpHasta").getValue()){
				errorFechaHasta = this._validateDate(this.byId("inpHasta"));
			}else{
				errorFechaHasta = false;
			}
			
			if(this.byId("inpFactura").getValue()){
				errorFactura = this._validateInput(this.byId("inpFactura"));
			}else{
				errorFactura = false;
			}
			
			errorCuit = this._validateInput(this.byId("inpCuit"));
			
			if(errorCuit || errorFechaDesde || errorFechaHasta || errorFactura) {
				return;
			}
			
			this.byId("VBoxBuscar").addStyleClass("sapUiLargeMarginBottom");
			
			this.setVisibleOnSearch(true);
			var oCards = this.byId("Cards");
			var oPage = this.byId("PageMonFac");
			jQuery.sap.delayedCall(500, oPage, "scrollToElement", [oCards,700]);
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
		
		onPressCard: function(oEvent) {
			var sValueSoc = this.byId("inpSociedad").getSelectedKey();
			var sValueFactura = this.byId("inpFactura").getValue();
			var sValueFecha1 = this.byId("inpDesde").getDateValue();
			var sValueFecha2 = this.byId("inpHasta").getDateValue();
			var sValueCuit = this.byId("inpCuit").getValue();
			var sValueEstado = oEvent.getSource().getProperty("header").slice(0,-1);
			
			var sMessage = this.getResourceBundle().getText("filterMessageTitle",oEvent.getSource().getProperty("header"));
			this.getModel("monFacView").setProperty("/filterMessage", sMessage);
			this.byId("filterMessageStrip").setVisible(true);
			
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
			
			var oTable = this.getView().byId("mainTable");
			oTable.bindItems({	path: "/datosCabeceraSet",
								template: this.byId("item"),
								templateShareable: true,
								filters: [oFilterSociedad,oFilterFactura,oFilterFecha,oFilterCuit,oFilterEstado]
			});
		},
		
		onPressQuitarFiltro: function() {
			
			this.byId("filterMessageStrip").setVisible(false);
			this.onPressBuscarFactura();
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