sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (UIComponent, JSONModel, Device) => {
	"use strict";

	return UIComponent.extend("frontend.Component", {
		init() {
			UIComponent.prototype.init.apply(this, arguments);
		},

		getContentDensityClass() {
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
	});
});
