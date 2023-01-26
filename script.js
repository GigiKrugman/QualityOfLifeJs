//first step: Making sure that the input form listen to an actual input after the search

const formSection = document.getElementById("search--form--section");
formSection.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("search--bar").value = city;
});
//contact the Api that return data in Ashync Mode
//Display it!;)
