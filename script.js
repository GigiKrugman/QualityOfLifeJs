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
      displayData(data);
    });
  // fetch(`https://api.teleport.org/api/urban_areas/?slug:${city}/images/`)
  //   .then((response) => response.json())
  //   .then((image) => {
  //     console.log(image);
  //   });
}

function displayData(data) {
  const cityData = data._embedded["city:search-results"];

  //console.log(cityData);
  const urbanArea =
    cityData[0]._embedded["city:item"]._embedded["city:urban_area"]._embedded[
      "ua:scores"
    ];
  //console.log(urbanArea);
  const categories = urbanArea.categories;

  const descriptions = urbanArea.summary;

  const qualityOfLife = urbanArea.teleport_city_score;

  let results = document.getElementById("results-list-categories");
  results.innerHTML += "<h2>Categories:</h2><ul>";
  categories.forEach((category) => {
    results.innerHTML += `<ul><li>${category.name}: ${category.score_out_of_10}</li></ul>`;
  });
  //results += "</ul>";
  document.getElementById(
    "results-list-summary"
  ).innerHTML += `<h3>Summary:</h3> ${descriptions}`;
  document.getElementById(
    "results-list-score"
  ).innerHTML += `<h4>Quality of Life:</h4> ${qualityOfLife}`;

  //document.getElementById("results-list").innerHTML = results;
}
