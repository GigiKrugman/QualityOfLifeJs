import { getCityData } from "../JS/api";

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("search-input").value;
    getCityData(city);
  });

export function displayData(data) {
  const cityData = data._embedded["city:search-results"];

  const urbanArea =
    cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded[
      "ua:scores"
    ];

  const categories = urbanArea.categories;
  const descriptions = urbanArea.summary;
  const qualityOfLife = urbanArea.teleport_city_score;

  let results = document.getElementById("results-list-categories");
  results.innerHTML += `<h2 class="header--js" >Categories:</h2><ul>`;
  categories.forEach((category) => {
    results.innerHTML += `<div class="categories--div"><ul><li class="categories--list--js">${
      category.name
    }: ${category.score_out_of_10.toFixed(2)} / 10</li></ul></div>`;
  });

  document.getElementById(
    "results-list-summary"
  ).innerHTML += `<div class="description--js"><h3>Summary:</h3><p> ${descriptions} </p></div>`;
  document.getElementById(
    "results-list-score"
  ).innerHTML += `<div class="quality--percentage--js"><h4>Quality of Life:</h4> ${qualityOfLife.toFixed(
    1
  )} points out of 100</div>`;
}

export function hideBackgroundImage() {
  document.querySelector(".background--image").style.display = "none";
}

function showBackgroundImage() {
  document.querySelector(".background--image").style.display = "flex";
}

export function clearContent() {
  document.getElementById("results-list-categories").innerHTML = "";
  document.getElementById("results-list-summary").innerHTML = "";
  document.getElementById("results-list-score").innerHTML = "";
  showBackgroundImage();
}

document.getElementById("clear-btn").addEventListener("click", clearContent);
