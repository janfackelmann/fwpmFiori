sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	
	
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
		}
	});
}, /* bExport= */ true);