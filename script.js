document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("search-input").value;
    getCityData(city);
  });

function getCityData(city) {
  fetch(
    `https://api.teleport.org/api/cities/?search=${city}&embed=city:search-results/city:item/city:urban_area/ua:scores`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayData(data);
    });
}

function displayData(data) {
  const cityData = data._embedded["city:search-results"];

  const urbanArea =
    cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded[
      "ua:scores"
    ];
  //console.log(urbanArea);
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
  //results += "</ul>";
  document.getElementById(
    "results-list-summary"
  ).innerHTML += `<div class="description--js"><h3>Summary:</h3><p> ${descriptions} </p></div>`;
  document.getElementById(
    "results-list-score"
  ).innerHTML += `<div class="quality--percentage--js"><h4>Quality of Life:</h4> ${qualityOfLife.toFixed(
    1
  )} points out of 100</div>`;

  //document.getElementById("results-list").innerHTML = results;
}

function clearContent() {
  document.getElementById("results-list").innerHTML = "";
}

// function clearInput() {
//   document.getElementById("search-form").reset();
// }
