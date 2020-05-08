sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("neo.tgs.controller.MonitorCC", {
		formatter: formatter,
		
		onInit: function () {
			
				var iOriginalBusyDelay,
				oViewModel;
			// Modelo usado para controlar numeros en cards y total en tabla, y delays
			oViewModel = new JSONModel({
				tableTitle : this.getResourceBundle().getText("monitorCCTituloTabla"),
				tableBusyDelay : 0,
				total: 0,
				delay : 0
			});
			this.setModel(oViewModel, "monCCView");
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
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			
			
			//creo los filtros de todos los inputs menos el de estado
			var sValueSoc = this.byId("inpSociedad").getSelectedKey();
			var sValueFecha1 = this.byId("inpDesde").getDateValue();
			var sValueFecha2 = this.byId("inpHasta").getDateValue();
			var sValueCuit = this.byId("inpCuit").getValue();
			
			var oFilterSociedad = new Filter(
				"Bukrs",
				sap.ui.model.FilterOperator.EQ, sValueSoc
			);
			var oFilterFecha = new Filter(
				"Bldat",
				sap.ui.model.FilterOperator.BT, sValueFecha1, sValueFecha2
			);
			var oFilterCuit = new Filter(
				"Xblnr",
				sap.ui.model.FilterOperator.EQ, sValueCuit
			);
			
			//solo actualizo los contadores si la tabla no esta vacia y el length es final
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("monitorCCTituloTablaCount", [iTotalItems]);
				oModel.read("/datosCCSet/$count", {
					filters: [oFilterSociedad,oFilterFecha,oFilterCuit]
				});
			} else {
				sTitle = this.getResourceBundle().getText("monitorCCTituloTabla");
			}
			this.getModel("monCCView").setProperty("/tableTitle", sTitle);
		},
		
		setVisibleOnSearch: function(boolean) {
			var oTable = this.byId("mainTableCC");
			oTable.setVisible(boolean);
		},
		
		onPressBuscarFactura: function() {
			
			var errorFechaDesde, errorFechaHasta,errorCuit;
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
			
			errorCuit = this._validateInput(this.byId("inpCuit"));
			
			if(errorCuit || errorFechaDesde || errorFechaHasta) {
				return;
			}
			
			this.byId("VBoxBuscar").addStyleClass("sapUiLargeMarginBottom");
			
			this.setVisibleOnSearch(true);
			var oTable = this.byId("mainTableCC");
			var oPage = this.byId("PageMonCC");
			jQuery.sap.delayedCall(500, oPage, "scrollToElement", [oTable,700]);
			var sValueSoc = this.byId("inpSociedad").getSelectedKey();
			var sValueFecha1 = this.byId("inpDesde").getDateValue();
			var sValueFecha2 = this.byId("inpHasta").getDateValue();
			var sValueCuit = this.byId("inpCuit").getValue();
			
			var oFilterSociedad = new Filter(
				"Bukrs",
				sap.ui.model.FilterOperator.EQ, sValueSoc
			);
			var oFilterFecha = new Filter(
				"Bldat",
				sap.ui.model.FilterOperator.BT, sValueFecha1, sValueFecha2
			);
			var oFilterCuit = new Filter(
				"Xblnr",
				sap.ui.model.FilterOperator.EQ, sValueCuit
			);
			this._onListMatched(oFilterSociedad,oFilterFecha,oFilterCuit);
			
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
		},
		
		_onListMatched : function (oFilterSociedad,oFilterFecha,oFilterCuit) {
		
			var oTable = this.getView().byId("mainTableCC");
			oTable.bindItems({	path: "/DatosCCSet",
								template: this.byId("item"),
								templateShareable: true,
								filters: [oFilterSociedad,oFilterFecha,oFilterCuit]
			});
		}
	});
});