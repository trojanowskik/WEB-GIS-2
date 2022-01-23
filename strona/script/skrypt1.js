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
  
  view.ui.add("topbar", "top-right");

  document
    .getElementById("distanceButton")
    .addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

  document
    .getElementById("areaButton")
    .addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("area");
      } else {
        setActiveButton(null);
      }
    });

function setActiveWidget(type) {
  switch (type) {
    case "distance":
      activeWidget = new DistanceMeasurement2D({
        view: view
      });

      activeWidget.viewModel.start();

      view.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById("distanceButton"));
      break;

    case "area":
      activeWidget = new AreaMeasurement2D({
        view: view
      });

      activeWidget.viewModel.start();

      view.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById("areaButton"));
      break;

    case null:
      if (activeWidget) {
        view.ui.remove(activeWidget);
        activeWidget.destroy();
        activeWidget = null;
      }
      break;
  }
}

function setActiveButton(selectedButton) {
  view.focus();
  let elements = document.getElementsByClassName("active");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}
});