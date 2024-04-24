sap.ui.getCore().attachInit(function () {
    var oModel = new sap.ui.model.odata.v4.ODataModel({
        serviceUrl: "/odata/v4/backend/",
        synchronizationMode: "None",
        autoExpandSelect: true,
        operationMode: "Server"
    });
    var oTable = new sap.ui.table.Table({
        selectionMode: sap.ui.table.SelectionMode.None,
        enableCellFilter: true,
        visibleRowCount: 100,
        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
        enableColumnReordering: false,
        enableSelectAll: false,
        rows: "{/cities}",
        extension: [
            new sap.m.Toolbar({
                style: sap.m.ToolbarStyle.Clear,
                height: "3rem",
                content: [
                    new sap.m.Title({ text: "CITIES" }),
                    new sap.m.ToolbarSpacer(),
                    new sap.m.SearchField({
                        width: "70%",
                        liveChange: function (oEvent) {
                            var sQuery = oEvent.getParameter("newValue");
                            var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
                            oTable.getBinding("rows").filter([oFilter]);
                        }
                    }),
                    new sap.m.ToolbarSpacer(),
                    new sap.m.Button({
                        text: "Add City",
                        icon: "sap-icon://add",
                        type: sap.m.ButtonType.Neutral,
                        press: function () {
                            var oInputName = new sap.m.Input({ placeholder: "Name", type: sap.m.InputType.Text });
                            var oInputArea = new sap.m.Input({ placeholder: "Area", type: sap.m.InputType.Number });
                            var oInputPopulation = new sap.m.Input({ placeholder: "Population", type: sap.m.InputType.Number });
                            var oInputDensity = new sap.m.Input({ placeholder: "Density", type: sap.m.InputType.Number, editable: false });

                            oInputPopulation.attachLiveChange(function (oEvent) {
                                updateDensity();
                            });

                            oInputArea.attachLiveChange(function (oEvent) {
                                updateDensity();
                            });

                            function updateDensity() {
                                var population = parseFloat(oInputPopulation.getValue());
                                var area = parseFloat(oInputArea.getValue());

                                if (!isNaN(population) && !isNaN(area) && area !== 0) {
                                    var density = population / area;
                                    oInputDensity.setValue(density.toFixed(2));
                                } else {
                                    oInputDensity.setValue("");
                                }
                            }

                            var oDialog = new sap.m.Dialog({
                                title: "Add City",
                                content: [
                                    new sap.ui.layout.form.SimpleForm({
                                        layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                                        width: "100%",
                                        content: [
                                            new sap.m.Label({ text: "Name" }),
                                            oInputName,
                                            new sap.m.Label({ text: "Area" }),
                                            oInputArea,
                                            new sap.m.Label({ text: "Population" }),
                                            oInputPopulation,
                                            new sap.m.Label({ text: "Density" }),
                                            oInputDensity
                                        ]
                                    })
                                ],
                                beginButton: new sap.m.Button({
                                    text: "Add",
                                    // FUNCTION TO ADD CITY and send the data to addCity action to the backend 
                                    press: function () {
                                        // get all the values from the input fields and console log it 
                                        console.log(oInputName.getValue());
                                        console.log(oInputArea.getValue());
                                        console.log(oInputPopulation.getValue());
                                        
                                        // validate the input fields
                                        if(oInputName.getValue() === "" || isNaN(parseFloat(oInputArea.getValue())) || isNaN(parseFloat(oInputPopulation.getValue())) || parseFloat(oInputArea.getValue()) === 0){
                                            sap.m.MessageToast.show("Invalid Input");
                                        } else {
                                            var oData = {
                                                name: oInputName.getValue(),
                                                area: parseFloat(oInputArea.getValue()),
                                                population: parseFloat(oInputPopulation.getValue())
                                            };
                                            $.ajax({
                                                url: "/odata/v4/backend/addCity",
                                                method: "POST",
                                                contentType: "application/json",
                                                data: JSON.stringify(oData),
                                                success: function(data){
                                                    sap.m.MessageToast.show("City Added Successfully");
                                                    oDialog.close();
                                                    // oModel.refresh();
                                                },
                                                error: function(err){
                                                    sap.m.MessageToast.show("City not added successfully");
                                                }
                                            });

                                        }

                                    }
                                }),
                                endButton: new sap.m.Button({
                                    text: "Cancel",
                                    press: function () {
                                        oDialog.close();
                                    }
                                })
                            });
                            oDialog.open();
                        }
                    })
                ]
            })
        ],

        columns: [
            new sap.ui.table.Column({
                label: new sap.m.Title({
                    text: "Name"
                }),
                showFilterMenuEntry: false,
                template: new sap.m.Text({ text: "{name}" }),
                sortProperty: "name",
                filterProperty: "name",
                width: "auto"
            }),
            new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Area (sq.km.)" }),
                template: new sap.m.Text({ text: "{area}" }),
                showFilterMenuEntry: false,
                sortProperty: "area",
                filterProperty: "area",
                width: "auto"
            }),
            new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Population" }),
                template: new sap.m.Text({ text: "{population}" }),
                showFilterMenuEntry: false,
                sortProperty: "population",
                filterProperty: "population",
                width: "auto"
            }),
            new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Density (per sq.km.)" }),
                template: new sap.m.Text({ text: "{density}" }),
                showFilterMenuEntry: false,
                sortProperty: "density",
                filterProperty: "density",
                width: "auto"
            })
        ]
    });
    oTable.addStyleClass("sapUiSizeCozy");
    oTable.setRowSettingsTemplate(new sap.ui.table.RowSettings({
        highlight: { parts: ["status"] }
    }));
    oTable.setModel(oModel);
    oTable.bindRows("/cities");

    new sap.m.Shell({
        app: new sap.m.App({
            pages: [
                new sap.m.Page({
                    enableScrolling: false,
                    titleAlignment: sap.ui.core.TextAlign.Center,
                    backgroundDesign: sap.m.PageBackgroundDesign.List,
                    titleLevel: sap.ui.core.TitleLevel.H1,
                    title: "Coding Exercise",
                    floatingFooter: false,
                    content: [
                        oTable
                    ],
                    footer: new sap.m.Toolbar({
                        content: [
                            new sap.m.ToolbarSpacer(),
                            new sap.m.Text({ text: "Developed By Krish Bhardwaj" })
                        ]
                    })
                })
            ]
        })
    }).placeAt("content");
});