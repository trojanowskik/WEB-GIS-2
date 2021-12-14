"use strict"

let witacz = document.getElementById("witacz")

let odwiedzajacy = prompt("Wpisz swoje imię");
  if (odwiedzajacy !== null) {
    witacz.innerText = "Witaj na stronie " + odwiedzajacy + "!";
  }