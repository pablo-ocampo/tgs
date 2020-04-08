/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"neo/tgs/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});