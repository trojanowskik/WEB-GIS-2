"use strict"

require([
  'esri/Map',
  'esri/views/MapView',
  'dijit/form/ToggleButton',
  'dijit/form/Button',
  'esri/layers/FeatureLayer',
  'esri/Graphic',
  'esri/layers/GraphicsLayer',
  'esri/widgets/BasemapGallery',
  'esri/widgets/Expand',
  'esri/widgets/Legend',
  "esri/widgets/LayerList",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Search"
], (Map, MapView, ToggleButton, Button, FeatureLayer, Graphic, GraphicsLayer, BasemapGallery, Expand, Legend, LayerList, DistanceMeasurement2D, AreaMeasurement2D, Search) => {

  const template = {
    title: "{gmina}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "gmina",
            label: "Nazwa miasta: "
          },
          {
            fieldName: "TERYT",
            label: "Kod teryt:"
          }
        ]
      }
    ]
  };

  const fl = new FeatureLayer({
      url: "https://services8.arcgis.com/BB7PJcEB1V3zsEXL/arcgis/rest/services/miasta_wojewodzkie/FeatureServer" ,
      popupTemplate: template
  });


  const map1 = new Map({
      basemap: "topo-vector",
      layers: fl
  });

  const view = new MapView({
      map: map1,
      container: "map",
      zoom: 6,
      center: [21, 52]
  });

  const basemap = "hybrid";

  const btn = new ToggleButton({
      showLabel: true,
      onClick: function(){
          map1.basemap = basemap
      }
  }, "basemapToggle").startup();

  const zoomIn = new Button({
      showLabel: true,
      onClick: function(){
          view.zoom += 1;
      }
  }, "zoomIn");

  const zoomOut = new Button({
      showLabel: true,
      onClick: function(){
          view.zoom -= 1;
      }
  }, "zoomOut");
  
  const basemapGalleryWg = new BasemapGallery({
      view: view
  });

  const expWg = new Expand({
      view: view,
      content: basemapGalleryWg
  });

  view.ui.add(expWg, {position: "top-right"});

  const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: fl,
          title: "Granice miast wojewódzkich"
        }
      ]
      
  });

  view.ui.add(legend, {position: "bottom-right"});

  const layerlist = new LayerList({
    view: view,
  });

  view.ui.add(layerlist, "bottom-left")

  const searchWidget = new Search({
    view: view,
    allPlaceholder: "Nazwa miasta",
    includeDefaultSources: false,
    sources: [{
      layer: fl,
      searchFields: ["gmina"],
      suggestionTemplate: "{gmina}",
      exactMatch: false,
      outFields: ["*"],
      placeholder: "Nazwa miasta: ",
      name: "Miasta",
      zoomScale: 100000,
      resultSymbol: template
    }]
  });

  view.ui.add(searchWidget, {
    position: "top-left"
  });
  
  const measurementWg = new AreaMeasurement2D({
    view: view
  });
  const distanceWg = new DistanceMeasurement2D({
      view: view
  });

  const exp2 = new Expand({
    view: view,
    content: distanceWg
  });
  const exp3 = new Expand({
    view: view,
    content: measurementWg
  });

  view.ui.add(exp2, {position: "top-right"});
  view.ui.add(exp3, {position: "top-right"});

  let btnZoom1 = document.getElementById('btn1');
  let btnZoom2 = document.getElementById('btn2');
  let btnZoom3 = document.getElementById('btn3');
  let btnZoom4 = document.getElementById('btn4');
  let btnZoom5 = document.getElementById('btn5');

  btnZoom1.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [21.050202, 52.236639],
      zoom: 11
    }, opts);
  
  });

  btnZoom2.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [19.939640, 50.057767],
      zoom: 11
    }, opts);
  
  });

  btnZoom3.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [19.453812, 51.756736],
      zoom: 11
    }, opts);
  
  });

  btnZoom4.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [17.033061, 51.108738],
      zoom: 11
    }, opts);
  
  });

  btnZoom5.addEventListener('click', function(){

    let opts = {
      duration: 2000
  };

  view.goTo({
      target: [16.918139, 52.401702],
      zoom: 11
    }, opts);
  
  });

});