sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/layout/form/SimpleForm"
], (
	Controller,
	SimpleForm) => {
	"use strict";

	return Controller.extend("frontend.controller.App", {
		onInit() {
			var oModel = new sap.ui.model.odata.v4.ODataModel({
				serviceUrl: "/odata/v4/backend/",
				synchronizationMode: "None",
				autoExpandSelect: true,
				operationMode: "Server"
			}, true);
			this.getView().byId("cityTable").setModel(oModel);

		},
		onSearch: function (oEvent) {
			const oTable = this.getView().byId("cityTable");
			var sQuery = oEvent.getParameter("newValue");
			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
			oTable.getBinding("rows").filter([oFilter]);
		},
		updateDensity: function () {
			var population = parseFloat(this.oInputPopulation.getValue());
			var area = parseFloat(this.oInputArea.getValue());

			if (!isNaN(population) && !isNaN(area) && area !== 0) {
				var density = population / area;
				this.oInputDensity.setValue(density.toFixed(2));
			} else {
				this.oInputDensity.setValue("");
			}
		},
		addCity: function () {
			if (this.oInputName.getValue() === "" || isNaN(parseFloat(this.oInputArea.getValue())) || isNaN(parseFloat(this.oInputPopulation.getValue())) || parseFloat(this.oInputArea.getValue()) === 0) {
				sap.m.MessageToast.show("Invalid Input");
			} else {
				var oData = {
					name: this.oInputName.getValue(),
					area: parseFloat(this.oInputArea.getValue()),
					population: parseFloat(this.oInputPopulation.getValue())
				};
				$.ajax({
					url: "/odata/v4/backend/addCity",
					method: "POST",
					contentType: "application/json",
					data: JSON.stringify(oData),
					success: function () {
						sap.m.MessageToast.show("City Added Successfully");
						this.oDialog.close();
					}.bind(this),
					error: function (err) {
						sap.m.MessageToast.show("City not added successfully");
					}
				});
			}

		},
		onAddCity: function () {
			this.oInputName = new sap.m.Input({ placeholder: "Name", type: sap.m.InputType.Text });
			this.oInputArea = new sap.m.Input({ placeholder: "Area", type: sap.m.InputType.Number });
			this.oInputPopulation = new sap.m.Input({ placeholder: "Population", type: sap.m.InputType.Number });
			this.oInputDensity = new sap.m.Input({ placeholder: "Density", type: sap.m.InputType.Number, editable: false });
			this.oForm = new SimpleForm({
				layout: "ResponsiveGridLayout",
				width: "100%",
				content: [
					new sap.m.Label({ text: "Name" }),
					this.oInputName,
					new sap.m.Label({ text: "Area" }),
					this.oInputArea,
					new sap.m.Label({ text: "Population" }),
					this.oInputPopulation,
					new sap.m.Label({ text: "Density" }),
					this.oInputDensity
				]
			})
			this.oInputPopulation.attachLiveChange(() => this.updateDensity());
			this.oInputArea.attachLiveChange(() => this.updateDensity());
			this.oDialog = new sap.m.Dialog({
				title: "Add City",
				content: [
					this.oForm
				],
				beginButton: new sap.m.Button({
					text: "Add",
					press: this.addCity.bind(this)
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: () => this.oDialog.close()
				})
			});
			this.oDialog.open();
		}
	});
});
