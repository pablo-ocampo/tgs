sap.ui.define([], function () {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit : function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		
		tipoCambio : function (sValue) {
			debugger;
			if (!sValue) {
				return "";
			}
			return sValue.toLocaleString("de-DE", {minimumFractionDigits: 2});
		},
		
		dateSap : function (sValue) {
			if (!sValue) {
				return "";
			}
			return sValue.toLocaleDateString();
		},
		
		dateBackEnd : function (sValue) {
		}

	};

});