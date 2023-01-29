//first step: Making sure that the input form listen to an actual input after the search

// const searchBar = document.getElementById("search--bar");
// const searchBtn = document.getElementById("search--btn");

// document
//   .getElementById("search--btn")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     const city = document.getElementById("search--bar").value;
//     getData(city);
//   });

// // searchBtn.addEventListener("click", function event() {
// //   searchValue = searchBar.value;
// //   const city = searchValue;
// // });
// // //contact the Api that return data in Ashync Mode
// function getData(city) {
//   const url = `https://api.teleport.org/api/cities/?search=${city}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const cityData = data._embedded["city:search-results"][0];
//       displayData(cityData);
//     })
//     .catch((error) => console.log(error));
// }

// //Display it!;)

// function displayData(data) {
//   const name = data.full_name;
//   const summary = data.short_description;
//   const quality_of_life =
//     data._links["city:urban_area"]["ua:scores"][0].life_score;
//   document.getElementById("categories--paragraph").innerHTML = name;
//   document.getElementById("description--paragraph").innerHTML = summary;
//   document.getElementById("quality-of-life--paragraph").innerHTML =
//     quality_of_life;
// }
// document
//   .getElementById("search-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const city = document.getElementById("city-input").value;
//     getData(city);
//   });

// function getData(city) {
//   fetch(`https://api.teleport.org/api/cities/?search=${city}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const cityData = data._embedded["city:search-results"][0];
//       displayData(cityData);
//     })
//     .catch((error) => console.log(error));
// }

// function displayData(data) {
//   document.getElementById("description").innerHTML = data.summary;

//   const score = data["teleport_city_score"];
//   document.getElementById("score").innerHTML = score;

//   document.getElementById("results-section").style.display = "block";
// }
// get the search bar element
// document.querySelector("#search-btn").addEventListener("click", (event) => {
//   event.preventDefault();
//   const cityName = document.querySelector("#city-search").value;
//   console.log(cityName);
//   fetch(
//     fetch(
//       "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores/"
//     )
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // get the categories
//       const categories = data.categories;
//       console.log(categories);
//       // get the city score
//       const cityScore = data.teleport_city_score;
//       console.log(categories);
//       // get the summary
//       const summary = data.summary;
//       console.log(categories);
//       // create a div element to display the data
//     });
// });

//       const city = data._embedded["city:search-results"][0];
//       // check if city._links["city:item"] exists
//       if (city._links["city:item"]) {
//         fetch(city._links["city:item"].href + "scores/")
//           .then((response) => response.json())
//           .then((data) => {
//             // get the categories
//             const categories = data.categories;
//             console.log(categories);
//             // get the city score
//             const cityScore = data.teleport_city_score;
//             console.log(categories);
//             // get the summary
//             const summary = data.summary;
//             console.log(categories);
//             // create a div element to display the data
//             const scoresDiv = document.querySelector("#result-container");
//             scoresDiv.innerHTML = "";
//             categories.forEach((category) => {
//               scoresDiv.innerHTML += `<div>
//                                         <p>${category.name} : ${category.score_out_of_10}</p>
//                                       </div>`;
//             });
//             scoresDiv.innerHTML += `<div>
//                                       <p>City Score: ${cityScore.teleport_city_score}</p>
//                                       <p>Summary : ${summary}</p>
//                                     </div>`;
//           });
//       } else {
//         console.log("City not found");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });
// const searchInput = document.getElementById("search-input");

// searchInput.addEventListener("submit", function () {
//   // Get the search input value
//   const searchValue = document.getElementById("submit");
//   // Make a fetch request to the Teleport API
//   fetch(`https://api.teleport.org/api/urban_areas/?slug:${searchValue}/scores/`)
//     .then((response) => console.log(response.json()))
//     .then((data) => {
//       console.log(data);
//     });
// });

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
      const cityData = data._embedded["city:search-results"];
      //console.log(cityData);
      const urbanArea =
        cityData[0]._embedded["city:item"]._embedded["city:urban_area"]
          ._embedded["ua:scores"];
      //console.log(urbanArea);
      const categories = urbanArea.categories;
      console.log(categories);
      const descriptions = urbanArea.summary;
      console.log(descriptions);
      const qualityOfLife = urbanArea.teleport_city_score.teleport_city_score;
      console.log(qualityOfLife);
    });
}
