"use strict"

let witacz = document.getElementById("witacz")

let odwiedzajacy = prompt("Wpisz swoje imię");
  if (odwiedzajacy !== null) {
    witacz.innerText = "Witaj na stronie " + odwiedzajacy + "!";
  };

  require([
  "esri/Map",
    "esri/views/MapView"
  ], (Map, MapView) => {

    const map1 = new Map({
      basemap: "streets-night-vector"
    })

    const view = new MapView({
      map: map1,
      container: "mapa",
      center: [-100.2424, 36,12424],
      zoom: 13
    })
  });