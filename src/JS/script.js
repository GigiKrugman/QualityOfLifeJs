import { showErrorMessage, hideErrorMessage } from "../JS/error";
import { showLoading, hideLoading } from "./loading";

export function getCityData(city) {
  fetch(
    `https://api.teleport.org/api/cities/?search=${city}&embed=city:search-results/city:item/city:urban_area/ua:scores`
  )
    .then((response) => {
      showLoading();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayData(data);
      hideErrorMessage();
      hideBackgroundImage();
    })
    .catch((error) => {
      console.error("Error fetching city data:", error);
      showErrorMessage(city);
      hideBackgroundImage();
    })
    .finally(() => {
      hideLoading();
    });
}

const searchForm = document.getElementById("search-form");
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      const city = searchInput.value;
      getCityData(city);
    }
  });
}

export function displayData(data) {
  clearContent();
  const cityData = data._embedded["city:search-results"];

  const urbanArea =
    cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded[
      "ua:scores"
    ];

  const categories = urbanArea.categories;
  const descriptions = urbanArea.summary;
  const qualityOfLife = urbanArea.teleport_city_score;

  //refactored to use .map()
  let results = document.getElementById("results-list-categories");
  if (results) {
    results.innerHTML += `<h2 class="header--js" >Categories:</h2><ul>`;
    const categoryElements = categories.map((category) => {
      results.innerHTML += `<div class="categories--div"><ul><li class="categories--list--js">${
        category.name
      }: ${category.score_out_of_10.toFixed(2)} / 10</li></ul></div>`;
    });
    results.innerHTML += categoryElements.join("");
  }

  const resultsSummary = document.getElementById("results-list-summary");
  if (resultsSummary) {
    resultsSummary.innerHTML += `<div class="description--js"><h3>Summary:</h3><p> ${descriptions} </p></div>`;
  }

  const resultsScore = document.getElementById("results-list-score");
  if (resultsScore) {
    resultsScore.innerHTML += `<div class="quality--percentage--js"><h4>Quality of Life:</h4> ${qualityOfLife.toFixed(
      1
    )} points out of 100</div>`;
  }
}

export function hideBackgroundImage() {
  const backgroundImage = document.querySelector(".background--image");
  if (backgroundImage) {
    backgroundImage.style.display = "none";
  }
}

function showBackgroundImage() {
  const backgroundImage = document.querySelector(".background--image");
  if (backgroundImage) {
    backgroundImage.style.display = "flex";
  }
}

export function clearContent() {
  const resultsListCategories = document.getElementById(
    "results-list-categories"
  );
  if (resultsListCategories) {
    resultsListCategories.innerHTML = "";
  }

  const resultsListSummary = document.getElementById("results-list-summary");
  if (resultsListSummary) {
    resultsListSummary.innerHTML = "";
  }

  const resultsListScore = document.getElementById("results-list-score");
  if (resultsListScore) {
    resultsListScore.innerHTML = "";
  }

  showBackgroundImage();
}

const clearBtn = document.getElementById("clear-btn");
if (clearBtn) {
  clearBtn.addEventListener("click", clearContent);
}

//added the clear content also the the "x" button in the search field
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    if (searchInput.value === "") {
      clearContent();
    }
  });
}
