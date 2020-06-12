sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/ListBase"

], function(BaseController, MessageBox, Utilities, History, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.team3.controller.Page1", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5eb403e648d24b7ca40f3a14";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		
		onShow : function() {
			MessageToast.show("MOIN SERVUS MOIN");
		},
		
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			this.getView().setModel(new sap.ui.model.json.JSONModel("/webapp/data/hierarchicalJSONData.json"), "hierarchicalModel");
		},
		
		//EVENT: Nach Laden der Liste wird das erste Item selektiert
		oufOrderList : function(){
			var oList = this.getView().byId("OrderList");
			var aItems = oList.getItems();

			oList.setSelectedItem(aItems[0]);

			this.selectListItem();
		},
		
		//EVENT: Klicken von ListItem füllt Werte auf der Rechten Seite
		//TODO: selectedItem wird 2 mal benutzt... globable Variable? 1. Eintrag wird nicht gefüllt
		selectListItem : function(oEvent){
			var BestellKopf = this.getView().byId("BestellKopf");
			
			var selectedItem= oEvent.getSource().getSelectedItem();
			
		BestellKopf.setTitle(selectedItem.getTitle());
		
		var lieferantZeile = this.getView().byId("Kopf2");
		var itemKey = oEvent.getSource().getSelectedItem().getTitle();
		 var sPath = "/PurchaseOrderSet" + "('" + itemKey +"')";
			lieferantZeile.bindElement({path:sPath});
		
		var posList = this.getView().byId("posList");
		var oItemTemplate = posList.getBindingInfo("items").template;
		var oFilter = new sap.ui.model.Filter({
			path: "PoNumber",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: itemKey});
		var oFilters=[oFilter];
		var bindingInf = {
			path: "/POItemSet",
			template: oItemTemplate,
			filters: oFilters
		};
		
		posList.bindAggregation("items", bindingInf);
		},
		
		//TODO onClose -> Wenn auf Ja/Nein gedrückt 
		BttnAnnehmenPress : function(){
			MessageBox.show("Wollen Sie diesen Auftrag wirklich Annehmen?", {
				icon: MessageBox.Icon.QUESTION,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (){
					
				}
			}
			);
		},
		
		//TODO onClose -> Wenn auf Ja/Nein gedrückt 
		BttnAblehnenPress : function(){
			MessageBox.show("Wollen Sie diesen Auftrag wirklich Ablehnen?", {
				icon: MessageBox.Icon.QUESTION,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (){
					
				}
			}
			);
		},
		
		//TODO OnPress -> Werte müssen aus dem Mittleren Bereich verschwinden
		BttnAbbrechenPress : function(){
		
		}	
	});
}, /* bExport= */ true);
