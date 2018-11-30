(function (PV) {
	"use strict";
	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);
	var definition = { 
		typeName: "comparison",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table',
				Height: 150,
				Width: 150,
				BorderRadius: 50				
			} 
		},
		configOptions: function () { 
			return [{ 
				title: "Format Symbol",
				mode: "format" 
			}];
		}
	}
	function getConfig(){
		return {			
			"type": "radar",
			"categoryField": "attribute",
			"startDuration": 2,
			"graphs": [
				{
					"balloonText": "[[value]] value of sinusoid",
					"bullet": "round",
					"id": "AmGraph-1",
					"valueField": "value"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"axisTitleOffset": 20,
					"gridType": "circles",
					"id": "ValueAxis-1",
					"minimum": 0,
					"axisAlpha": 0.15,
					"dashLength": 3
				}
			],
			"allLabels": [],
			"balloon": {},
			"titles": [],
			"dataProvider": [
				{
					"attribute": "sinusoid",
					"value": 156.9
				},
			]
		}
	}
	symbolVis.prototype.init = function(scope, elem) { 
		var container = elem.find('#container')[0];
		container.id = "comparison" + scope.symbol.Name;
		var chart=AmCharts.makeChart(container.id, getConfig());	
		function convertToChart(data){
			return data.Rows.map(function(item){
				return{
					value:item.Value,
					attribute:item.Label
				}
			});
		}
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			var dataprovider=convertToChart(data);
			chart.dataProvider=dataprovider;
			chart.validateData();
		}
	};
	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
