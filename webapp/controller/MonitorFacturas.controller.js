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
			var that = this;
				
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
					that._onListMatched();
				}
			);
		},
		
		onPressBuscarFactura: function() {
			this.createId("Cards");
			var oCards = $( "#Cards" )[ 0 ];
			oCards.scrollIntoView();
			
			
		},
		
		onSearch : function (evt) {
			// debugger;
			var sValue = evt.getParameter("query");
			if (!sValue) {
				sValue = evt.getParameter("newValue");
			}
			var oFilter = new Filter(
				"Xblnr",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			this.byId("mainTable").getBinding("items").filter([oFilter]);
		},
		
		_onListMatched : function (oEvent) {
		
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
								templateShareable: true
			// 					filters: [oFilter2],
			// 					parameters: {
			// 						expand: "zCliAdic"
								// }
			});
		},
		
		_bindView : function (sListPath) {
			// debugger;
			var oViewModel = this.getModel("listView"),
				oDataModel = this.getModel();
			this.getView().bindElement({
				path: sListPath,
				// parameters: {
				// 		expand: "zClientesSet"
				// 	},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		}
	});
});