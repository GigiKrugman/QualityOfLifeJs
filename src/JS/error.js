export function showErrorMessage(city) {
  document.getElementById(
    "error-text"
  ).innerText = `Sorry, but the city - ${city} - you were looking for  is not available! Try a different one!`;
  document.getElementById("error-message").style.display = "block";
}

export function hideErrorMessage() {
  document.getElementById("error-message").style.display = "none";
}
