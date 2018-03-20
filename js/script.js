const btn = document.getElementById("get-info");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const res = document.querySelector(".result");

function printInfo(inputDate) {
  return function () {
    if (this.status == 200) {
      let asteroidLenght = JSON.parse(this.responseText)["near_earth_objects"][inputDate];
      if (res.innerHTML != "") {
        res.innerHTML = "";
      }
      for (let i in asteroidLenght) {
        let asteroidName = JSON.parse(this.responseText)["near_earth_objects"][inputDate][i]["name"];
        let danger = JSON.parse(this.responseText)["near_earth_objects"][inputDate][i]["is_potentially_hazardous_asteroid"];
        let output = `
                    <ul>
                      <li>Object name: ${asteroidName}</li>
                      <li>Potential hazard: ${danger}</li>
                    </ul>
                   `
        res.innerHTML += output;
      }
    }
  }
}

btn.addEventListener("click", loadInfo, false);

function loadInfo(e) {
  const inputDate = `${year.value}-${month.value}-${day.value}`;
  if (inputDate != "--" && year.value >= 1500 && month.value <= 12 && day.value <= 31) {
    let xhr = new XMLHttpRequest();
    const link = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${inputDate}&end_date=${inputDate}&detailed=false&api_key=pwiphsxnmlaftrN3B3LRorXLJP6vvi0Fag4MeIBs`;
    xhr.onload = printInfo(inputDate);
    xhr.open("GET", link, true);
    xhr.send();
  }
  e.preventDefault();
}
