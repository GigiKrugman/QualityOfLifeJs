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

  let results = "";
  results += "<h3>Categories:</h3><ul>";
  categories.forEach((category) => {
    results += `<li>${category.name}: ${category.score_out_of_10}</li>`;
  });
  results += "</ul>";
  results += `<h3>Summary:</h3> ${descriptions}`;
  results += `<h3>Quality of Life:</h3> ${qualityOfLife}`;

  document.getElementById("results-list").innerHTML = results;
}
