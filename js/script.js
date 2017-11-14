let btn = document.getElementById("get-info");
let year = document.getElementById("year");
let month = document.getElementById("month");
let day = document.getElementById("day");
let res = document.querySelector(".result");

//  const inputDate = ;

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
                      <li>Potential hazard : ${danger}</li>
                    </ul>
                   `
        res.innerHTML += output;
      }
    }
  }
}

btn.addEventListener("click", loadInfo, false);

function loadInfo(e) {
  let xhr = new XMLHttpRequest();
  const inputDate = year.value + "-" + month.value + "-" + day.value;
  const link = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${inputDate}&end_date=${inputDate}&detailed=false&api_key=pwiphsxnmlaftrN3B3LRorXLJP6vvi0Fag4MeIBs`;
  console.log(inputDate);
  console.log(link);
  xhr.onload = printInfo(inputDate);
  xhr.open("GET", link, true);
  e.preventDefault();
  xhr.send();
}
