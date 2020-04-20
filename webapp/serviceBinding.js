function initModel() {
	var sUrl = "/sap/opu/odata/sap/Z_INGRESO_FAC_VIM_EXT_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}