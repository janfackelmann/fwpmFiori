sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device",
		"/sap/opu/odata/sap/ZOSO_PURCHASE_ORDER_SRV/"
	], function (JSONModel, Device) {
		"use strict";

		return {
			createDeviceModel : function () {
				var oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			},

			createFLPModel : function () {
				var fnGetuser = jQuery.sap.getObject("sap.ushell.Container.getUser"),
					bIsShareInJamActive = fnGetuser ? fnGetuser().isJamActive() : false,
					oModel = new JSONModel({
						isShareInJamActive: bIsShareInJamActive
					});
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			}
			
			// getServerData : function () {
			// 	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZOSO_PURCHASE_ORDER_SRV/", true);
			
			// 		oModel.setDefaultBindingMode("OneWay");
					
			// 		this.oSHTable.setModel(oModel);
	     
	     
			//     this.oSHTable.bindRows({
	  //  	    path: "/ZOSO_PURCHASE_ORDER_SRV",
	  //  	    parameters: {expand: "PurchaseOrder",
	  //  	    	select: "SALESORDERID,CURRENCY,GROSSAMOUNT,PARTNERID.PARTNERID,Buyer/COMPANYNAME"}
	    	   
	  //  	});
			// 			return oModel;
			// 	}
			};
		}
	
);