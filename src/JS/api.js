import { displayData } from "../JS/script";
import { showErrorMessage } from "../JS/error";
import { hideErrorMessage } from "../JS/error";
import { hideBackgroundImage } from "../JS/script";
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
