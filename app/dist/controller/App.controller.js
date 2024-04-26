sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/layout/form/SimpleForm"],(t,e)=>{"use strict";return t.extend("frontend.controller.App",{onInit(){var t=new sap.ui.model.odata.v4.ODataModel({serviceUrl:"/odata/v4/backend/",synchronizationMode:"None",autoExpandSelect:true,operationMode:"Server"},true);this.getView().byId("cityTable").setModel(t)},onSearch:function(t){const e=this.getView().byId("cityTable");var a=t.getParameter("newValue");var o=new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,a);e.getBinding("rows").filter([o])},updateDensity:function(){var t=parseFloat(this.oInputPopulation.getValue());var e=parseFloat(this.oInputArea.getValue());if(!isNaN(t)&&!isNaN(e)&&e!==0){var a=t/e;this.oInputDensity.setValue(a.toFixed(2))}else{this.oInputDensity.setValue("")}},addCity:function(){if(this.oInputName.getValue()===""||isNaN(parseFloat(this.oInputArea.getValue()))||isNaN(parseFloat(this.oInputPopulation.getValue()))||parseFloat(this.oInputArea.getValue())===0){sap.m.MessageToast.show("Invalid Input")}else{var t={name:this.oInputName.getValue(),area:parseFloat(this.oInputArea.getValue()),population:parseFloat(this.oInputPopulation.getValue())};$.ajax({url:"/odata/v4/backend/addCity",method:"POST",contentType:"application/json",data:JSON.stringify(t),success:function(){sap.m.MessageToast.show("City Added Successfully");this.oDialog.close()}.bind(this),error:function(t){sap.m.MessageToast.show("City not added successfully")}})}},onAddCity:function(){this.oInputName=new sap.m.Input({placeholder:"Name",type:sap.m.InputType.Text});this.oInputArea=new sap.m.Input({placeholder:"Area",type:sap.m.InputType.Number});this.oInputPopulation=new sap.m.Input({placeholder:"Population",type:sap.m.InputType.Number});this.oInputDensity=new sap.m.Input({placeholder:"Density",type:sap.m.InputType.Number,editable:false});this.oForm=new e({layout:"ResponsiveGridLayout",width:"100%",content:[new sap.m.Label({text:"Name"}),this.oInputName,new sap.m.Label({text:"Area"}),this.oInputArea,new sap.m.Label({text:"Population"}),this.oInputPopulation,new sap.m.Label({text:"Density"}),this.oInputDensity]});this.oInputPopulation.attachLiveChange(()=>this.updateDensity());this.oInputArea.attachLiveChange(()=>this.updateDensity());this.oDialog=new sap.m.Dialog({title:"Add City",content:[this.oForm],beginButton:new sap.m.Button({text:"Add",press:this.addCity.bind(this)}),endButton:new sap.m.Button({text:"Cancel",press:()=>this.oDialog.close()})});this.oDialog.open()}})});
//# sourceMappingURL=App.controller.js.map